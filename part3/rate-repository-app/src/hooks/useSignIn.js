import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });

    const signIn = async ({ username, password }) => {
        const res = mutate({ variables: { username, password } });
        return res;
    };

    return [signIn, result];
};

export default useSignIn;
