import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = new AuthStorage();

    const [mutate, result] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
