import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        height: 75,
        backgroundColor: theme.colors.background,
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
                <Text fontSize="heading" style={styles.text}>
                    Repositories
                </Text>
            </Pressable>
        </View>
    );
};

export default AppBar;
