import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import socket from '../services/socket';

export default function HomeScreen({ navigation }) {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        // Escuta atualizações do servidor
        socket.on('updateResults', (data) => {
            // Ordenar por porcentagem decrescente
            const sorted = data.sort((a, b) => b.percentage - a.percentage);
            setCandidates(sorted);
        });

        return () => {
            socket.off('updateResults');
        };
    }, []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('CandidateProfile', { candidate: item })}
        >
            <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{index + 1}º</Text>
            </View>
            <Image source={{ uri: item.photoUrl }} style={styles.photo} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>Nº {item.number}</Text>
            </View>
            <View style={styles.stats}>
                <Text style={styles.percentage}>{item.percentage}%</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Visão Geral</Text>
                <Text style={styles.headerSubtitle}>Resultados em Tempo Real</Text>
            </View>
            <FlatList
                data={candidates}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            
            <TouchableOpacity 
                style={styles.collectButton}
                onPress={() => navigation.navigate('Collection')}
            >
                <Text style={styles.collectButtonText}>Coletar Voto</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.chartButton}
                onPress={() => navigation.navigate('Chart')}
            >
                <Text style={styles.chartButtonText}>Ver Gráfico 3D</Text>
            </TouchableOpacity>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#A5B4FC',
        fontSize: 16,
        marginTop: 5,
    },
    list: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    number: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    stats: {
        alignItems: 'flex-end',
    },
    percentage: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#10B981',
    },
    collectButton: {
        backgroundColor: '#2563EB',
        margin: 15,
        marginBottom: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    collectButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartButton: {
        backgroundColor: '#4F46E5',
        margin: 15,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    chartButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
