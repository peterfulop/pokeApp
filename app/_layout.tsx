import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const queryClient = new QueryClient();
const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Pokedex',
                        headerRight: () => (
                            <Link href={'/favorites'} asChild>
                                <TouchableOpacity>
                                    <Ionicons name="heart-circle" size={26} color={'#fff'} />
                                </TouchableOpacity>
                            </Link>
                        ),
                    }}
                />
                <Stack.Screen
                    name="(pokemon)/[id]"
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="favorites"
                    options={{
                        title: 'Favorites',
                        presentation: 'modal',
                    }}
                />
            </Stack>
        </QueryClientProvider>
    );
};

export default Layout;
