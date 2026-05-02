import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function CandidateProfileScreen({ route, navigation }) {
    const { candidate } = route.params;

    // Lógica simples para simular "crescimento" baseado no ID/Número para fins de demonstração
    const isGrowing = candidate.number % 2 === 0;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>
                <Image source={{ uri: candidate.photoUrl }} style={styles.largePhoto} />
                <Text style={styles.name}>{candidate.name}</Text>
                <Text style={styles.number}>Número: {candidate.number}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Votos Recebidos</Text>
                    <Text style={styles.statValue}>{candidate.totalVotes}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Popularidade</Text>
                    <Text style={[styles.statValue, { color: '#10B981' }]}>{candidate.percentage}%</Text>
                </View>
            </View>

            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Histórico de Crescimento</Text>
                <View style={[styles.trendBox, isGrowing ? styles.trendUp : styles.trendDown]}>
                    <Text style={styles.trendText}>
                        {isGrowing ? '📈 Subindo nas pesquisas' : '📉 Caindo nas pesquisas'}
                    </Text>
                </View>
                <Text style={styles.historyDesc}>
                    O candidato apresentou uma {isGrowing ? 'alta' : 'baixa'} de popularidade na última semana com base nas coletas em tempo real dos dispositivos móveis.
                </Text>
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
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 150,
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -60,
    },
    largePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    number: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    statBox: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    historyContainer: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    trendBox: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    trendUp: {
        backgroundColor: '#D1FAE5',
    },
    trendDown: {
        backgroundColor: '#FEE2E2',
    },
    trendText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    historyDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    }
});
