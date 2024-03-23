import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getPokemonDetail, Pokemon } from '@/api/pokeapi';

const TestPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();

    const [details, setDetails] = useState<Pokemon | null>(null);

    useEffect(() => {
        const load = async () => {
            const details = await getPokemonDetail(id);
            setDetails(details);
            navigation.setOptions({
                title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
            });
        };
        load();
    }, [id]);

    return (
        <View
            style={{
                padding: 10,
            }}
        >
            {details && (
                <>
                    <View style={[styles.card, { alignItems: 'center' }]}>
                        <Image
                            source={{
                                uri: details.sprites.front_default,
                            }}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                        <Text style={styles.name}>
                            #{details.id} {details?.name}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stats:</Text>
                        {details.stats.map((stat: any) => (
                            <Text key={stat.stat.name}>
                                {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:{' '}
                                {stat.base_stat}
                            </Text>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        gap: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default TestPage;
