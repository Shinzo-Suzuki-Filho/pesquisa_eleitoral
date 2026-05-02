import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import socket from '../services/socket';

export default function ChartScreen({ navigation }) {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        // Fetch initial data
        fetch('http://localhost:3000/api/candidates')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => b.percentage - a.percentage);
                setCandidates(sorted);
            })
            .catch(err => console.error(err));

        // Real-time updates
        socket.on('updateResults', (data) => {
            const sorted = data.sort((a, b) => b.percentage - a.percentage);
            setCandidates(sorted);
        });

        return () => {
            socket.off('updateResults');
        };
    }, []);

    const colors = ['#1E3A8A', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Gráfico 3D (Simulação)</Text>
            </View>

            <View style={styles.chartContainer}>
                {/* 
                  Em uma aplicação real de produção React Native, usaríamos 'react-native-webview' 
                  integrado com a biblioteca Apache ECharts (gl) para renderizar um verdadeiro 
                  gráfico de pizza 3D. Abaixo, construímos uma interface esteticamente 
                  premium para representar os dados.
                */}
                <View style={styles.pseudoPie3D}>
                    <Text style={styles.pseudoPieText}>📊</Text>
                </View>
                <Text style={styles.chartSubtitle}>Distribuição de Votos</Text>
            </View>

            <View style={styles.legendContainer}>
                {candidates.map((c, index) => (
                    <View key={c.id} style={styles.legendItem}>
                        <View style={[styles.colorDot, { backgroundColor: colors[index % colors.length] }]} />
                        <Text style={styles.legendName}>{c.name}</Text>
                        <Text style={styles.legendPercentage}>{c.percentage}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
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
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    pseudoPie3D: {
        width: 200,
        height: 100,
        backgroundColor: '#1E3A8A',
        borderRadius: 100,
        transform: [{ scaleY: 0.5 }],
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 20,
        borderBottomColor: '#172554',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    pseudoPieText: {
        fontSize: 50,
        transform: [{ scaleY: 2 }], 
        color: '#FFF',
    },
    chartSubtitle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    legendContainer: {
        padding: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    colorDot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 15,
    },
    legendName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    legendPercentage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#10B981',
    }
});
