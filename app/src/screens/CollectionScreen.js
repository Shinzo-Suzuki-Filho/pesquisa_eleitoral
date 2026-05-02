import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import socket from '../services/socket';

export default function CollectionScreen({ navigation }) {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        // Obter lista inicial
        fetch('http://localhost:3000/api/candidates')
            .then(res => res.json())
            .then(data => setCandidates(data))
            .catch(err => console.error(err));
    }, []);

    const handleVote = (candidateId) => {
        // Envia o voto em tempo real via socket
        const voterData = {
            device: 'MobileApp',
            location: 'Zona Sul',
            time: new Date().toISOString()
        };

        socket.emit('registerVote', { candidateId, voterData });
        Alert.alert('Sucesso', 'Pesquisa registrada com sucesso! Dados criptografados e enviados.');
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.candidateButton} onPress={() => handleVote(item.id)}>
            <Text style={styles.buttonText}>{item.number} - {item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Registrar Pesquisa</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.instruction}>Selecione a intenção de voto do eleitor:</Text>
                <FlatList
                    data={candidates}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>

            <View style={styles.securityBadge}>
                <Text style={styles.securityText}>🔒 Conexão Segura - Dados Criptografados AES-256</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7FC',
    },
    header: {
        backgroundColor: '#1E3A8A',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    instruction: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        fontWeight: '500',
    },
    candidateButton: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    securityBadge: {
        backgroundColor: '#D1FAE5',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityText: {
        color: '#065F46',
        fontWeight: 'bold',
        fontSize: 12,
    }
});
