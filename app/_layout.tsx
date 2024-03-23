import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

const Layout = () => {
    return (
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
                }}
            />
            <Stack.Screen
                name="(pokemon)/[id]"
                options={{
                    title: '',
                }}
            />
        </Stack>
    );
};

export default Layout;
