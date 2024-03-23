import { getPokemon, Pokemon } from '@/api/pokeapi';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    useEffect(() => {
        const load = async () => {
            const response = await getPokemon();
            setPokemon(response);
        };
        load();
    }, []);

    return (
        <ScrollView>
            {pokemon.map((poke) => (
                <Link key={poke.id} href={`/(pokemon)/${poke.id}`} asChild>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Image source={{ uri: poke.image }} style={styles.preview} />
                            <Text style={styles.itemText}>{poke.name}</Text>
                            <Ionicons name="chevron-forward" size={24} />
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    );
};

export default Page;

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
