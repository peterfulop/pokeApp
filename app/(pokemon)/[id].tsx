import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getPokemonDetail, Pokemon } from '@/api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { storage } from '@/api/mmkv';

const TestPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();

    const [isFavorite, setIsFavorite] = useState<boolean>(
        storage.getString(`favorite-${id}`) === 'true'
    );

    const pokemonQuery = useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemonDetail(id),
        refetchOnMount: false,
    });

    useEffect(() => {
        const load = async () => {
            if (!pokemonQuery.data) return;
            // const isFavorite = await AsyncStorage.getItem(`favorite-${id}`);
            // setIsFavorite(isFavorite === 'true');F
            navigation.setOptions({
                title:
                    pokemonQuery.data.name.charAt(0).toUpperCase() +
                    pokemonQuery.data.name.slice(1),
            });
        };
        load();
    }, [pokemonQuery]);

    const toggleFavorite = async () => {
        storage.set(`favorite-${id}`, !isFavorite ? 'true' : 'false');
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text onPress={toggleFavorite}>
                    <Ionicons
                        name={isFavorite ? 'star' : 'star-outline'}
                        size={22}
                        color={'#fff'}
                    />
                </Text>
            ),
        });
    }, [isFavorite]);

    return (
        <View
            style={{
                padding: 10,
            }}
        >
            {pokemonQuery.data && (
                <>
                    <View style={[styles.card, { alignItems: 'center' }]}>
                        <Image
                            source={{
                                uri: pokemonQuery.data.sprites.front_default,
                            }}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                        <Text style={styles.name}>
                            #{pokemonQuery.data.id} {pokemonQuery.data?.name}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stats:</Text>
                        {pokemonQuery.data.stats.map((stat: any) => (
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
