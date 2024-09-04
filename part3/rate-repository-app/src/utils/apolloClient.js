import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'http://192.168.68.112:4000/graphql',
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
