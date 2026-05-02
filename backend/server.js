const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { getCandidatesWithVotes, addVote } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// REST API endpoint para pegar candidatos
app.get('/api/candidates', (req, res) => {
    getCandidatesWithVotes((err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// Endpoint para registrar um voto via REST
app.post('/api/vote', (req, res) => {
    const { candidateId, voterData } = req.body;
    if (!candidateId) return res.status(400).json({ error: 'candidateId é obrigatório' });
    
    addVote(candidateId, voterData, (err, voteId) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Emite atualização para todos os clientes conectados
        getCandidatesWithVotes((err, data) => {
            if (!err) {
                io.emit('updateResults', data);
            }
        });
        
        res.json({ success: true, voteId });
    });
});

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Enviar dados iniciais ao conectar
    getCandidatesWithVotes((err, data) => {
        if (!err) socket.emit('updateResults', data);
    });

    socket.on('registerVote', (data) => {
        const { candidateId, voterData } = data;
        addVote(candidateId, voterData, (err) => {
            if (!err) {
                // Ao registrar voto via socket, transmite para todos
                getCandidatesWithVotes((err, newData) => {
                    if (!err) io.emit('updateResults', newData);
                });
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
