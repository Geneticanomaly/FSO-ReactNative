import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const ApolloClient = createApolloClient(authStorage);

export default function App() {
    return (
        <>
            <NativeRouter>
                <ApolloProvider client={ApolloClient}>
                    <AuthStorageContext.Provider value={authStorage}>
                        <Main />
                    </AuthStorageContext.Provider>
                </ApolloProvider>
            </NativeRouter>
            <StatusBar style="auto" />
        </>
    );
}
