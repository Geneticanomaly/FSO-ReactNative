import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

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
        paddingLeft: 15,
        paddingTop: 10,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default AppBar;
