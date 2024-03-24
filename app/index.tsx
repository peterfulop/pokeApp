import { getPokemon, Pokemon } from '@/api/pokeapi';
import { Link } from 'expo-router';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';

const Page = () => {
    const pokemonQuery = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => getPokemon(),
        refetchOnMount: false,
    });

    const renderItem = ({ item }: { item: Pokemon }) => {
        return (
            <Link key={item.id} href={`/(pokemon)/${item.id}`} asChild>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.preview} />
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Ionicons name="chevron-forward" size={24} />
                    </View>
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {pokemonQuery.isLoading && <ActivityIndicator style={{ marginTop: 30 }} />}
            <FlashList
                data={pokemonQuery.data}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
                )}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={100}
            />
        </View>
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
