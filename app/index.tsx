import { getPokemon, Pokemon } from '@/api/pokeapi';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Page = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    useEffect(() => {
        const load = async () => {
            const response = await getPokemon();
            setPokemon(response);
        };
        load();
    }, []);
    console.log(pokemon);

    return (
        <View>
            <Text>index</Text>
            <Link href={'/test'}>
                <Text>Details Page</Text>
            </Link>
        </View>
    );
};

export default Page;
