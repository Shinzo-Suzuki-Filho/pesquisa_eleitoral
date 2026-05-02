const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');
const { encrypt, decrypt } = require('./cryptoUtils');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        initDb();
    }
});

const initDb = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS candidates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                photoUrl TEXT,
                number INTEGER UNIQUE NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                candidateId INTEGER,
                encryptedData TEXT NOT NULL,
                iv TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (candidateId) REFERENCES candidates(id)
            )
        `);

        // Insert initial candidates if empty
        db.get("SELECT COUNT(*) AS count FROM candidates", (err, row) => {
            if (row.count === 0) {
                const candidates = [
                    { name: 'João Silva', photoUrl: 'https://i.pravatar.cc/150?img=11', number: 10 },
                    { name: 'Maria Souza', photoUrl: 'https://i.pravatar.cc/150?img=5', number: 20 },
                    { name: 'Carlos Santos', photoUrl: 'https://i.pravatar.cc/150?img=13', number: 30 }
                ];
                
                const stmt = db.prepare("INSERT INTO candidates (name, photoUrl, number) VALUES (?, ?, ?)");
                candidates.forEach(c => stmt.run(c.name, c.photoUrl, c.number));
                stmt.finalize();
                console.log('Candidatos iniciais inseridos.');
            }
        });
    });
};

const getCandidatesWithVotes = (callback) => {
    db.all(`
        SELECT c.*, COUNT(v.id) as totalVotes
        FROM candidates c
        LEFT JOIN votes v ON c.id = v.candidateId
        GROUP BY c.id
    `, [], (err, rows) => {
        if (err) return callback(err);
        
        const totalOverallVotes = rows.reduce((sum, row) => sum + row.totalVotes, 0);
        
        const results = rows.map(row => ({
            ...row,
            percentage: totalOverallVotes > 0 ? ((row.totalVotes / totalOverallVotes) * 100).toFixed(2) : 0
        }));
        
        callback(null, results);
    });
};

const addVote = (candidateId, voterData, callback) => {
    const dataString = JSON.stringify(voterData || { time: Date.now() });
    const encrypted = encrypt(dataString);
    
    db.run(
        "INSERT INTO votes (candidateId, encryptedData, iv) VALUES (?, ?, ?)",
        [candidateId, encrypted.content, encrypted.iv],
        function(err) {
            callback(err, this ? this.lastID : null);
        }
    );
};

module.exports = {
    db,
    getCandidatesWithVotes,
    addVote
};
