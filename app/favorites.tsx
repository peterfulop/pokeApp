import { Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { storage } from '@/api/mmkv';
import { getPokemonDetail, Pokemon } from '@/api/pokeapi';
import { useQueries } from '@tanstack/react-query';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Animated, { FadeIn, SlideOutLeft, Layout } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

const Favorites = () => {
    const [data, setData] = useState<Pokemon[]>([]);

    const pokemonQueries = useQueries({
        queries: storage.getAllKeys().map((key) => {
            const pokemonId = key.split('-')[1];
            return {
                queryKey: ['pokemon', pokemonId],
                queryFn: () => getPokemonDetail(pokemonId),
            };
        }),
    });

    const allFinished = pokemonQueries.every((query) => query.isSuccess);

    useEffect(() => {
        if (allFinished) {
            const newData = pokemonQueries.map((query) => query.data!);
            setData(newData);
        }
    }, [allFinished]);

    const removeFavorite = (id: number) => {
        storage.delete(`favorite-${id}`);
        setData(data.filter((pokemon) => pokemon.id !== id));
    };

    return (
        <ScrollView>
            {data.length > 0 &&
                data.map((pokemon, index) => (
                    <Animated.View
                        layout={Layout.delay(200)}
                        entering={FadeIn.delay(100 * index)}
                        exiting={SlideOutLeft.duration(200)}
                        key={pokemon.id}
                        style={styles.item}
                    >
                        <Image
                            source={{ uri: pokemon.sprites.front_default }}
                            style={styles.preview}
                        />
                        <Text style={styles.itemText}>{pokemon.name}</Text>
                        <TouchableOpacity onPress={() => removeFavorite(pokemon.id)}>
                            <Ionicons name="trash" size={22} color={'red'} />
                        </TouchableOpacity>
                    </Animated.View>
                ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    preview: {
        width: 100,
        height: 100,
    },
    itemText: {
        fontSize: 20,
        textTransform: 'capitalize',
        flex: 1,
    },
});

export default Favorites;
