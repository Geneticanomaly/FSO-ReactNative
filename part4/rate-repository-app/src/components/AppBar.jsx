import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import AuthStorage from '../utils/authStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        height: 75,
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        margin: 10,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBar = () => {
    const navigate = useNavigate();
    const authStorage = new AuthStorage();
    const apolloClient = useApolloClient();

    const { data } = useQuery(ME);

    const handleSignOut = () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/signIn');
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable>
                    <Link to="/">
                        <Text fontSize="subheading" style={styles.text}>
                            Repositories
                        </Text>
                    </Link>
                </Pressable>
                {data?.me && (
                    <Pressable>
                        <Link to="/repository/review">
                            <Text fontSize="subheading" style={styles.text}>
                                Create a review
                            </Text>
                        </Link>
                    </Pressable>
                )}
                {data?.me && (
                    <Pressable>
                        <Link to={`/user/${data.me.id}/reviews`}>
                            <Text fontSize="subheading" style={styles.text}>
                                My reviews
                            </Text>
                        </Link>
                    </Pressable>
                )}
                {!data?.me && (
                    <Pressable>
                        <Link to="/signIn">
                            <Text fontSize="subheading" style={styles.text}>
                                Sign in
                            </Text>
                        </Link>
                    </Pressable>
                )}
                {!data?.me && (
                    <Pressable>
                        <Link to="/signUp">
                            <Text fontSize="subheading" style={styles.text}>
                                Sign up
                            </Text>
                        </Link>
                    </Pressable>
                )}
                {data?.me && (
                    <Pressable onPress={handleSignOut}>
                        <Text fontSize="subheading" style={styles.text}>
                            Sign out
                        </Text>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
