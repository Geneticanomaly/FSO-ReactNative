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
                        <Text fontSize="heading" style={styles.text}>
                            Repositories
                        </Text>
                    </Link>
                </Pressable>
                <Pressable>
                    <Link to="/signIn">
                        <Text fontSize="heading" style={styles.text}>
                            Sign in
                        </Text>
                    </Link>
                </Pressable>
                {data.me && (
                    <Pressable onPress={handleSignOut}>
                        <Text fontSize="heading" style={styles.text}>
                            Sign out
                        </Text>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
