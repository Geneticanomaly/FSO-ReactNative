import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik, useFormik } from 'formik';
import theme from '../theme';

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.text}>Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };
    return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: '90%',
        padding: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        width: '90%',
        padding: 15,
        marginTop: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: theme.fontWeights.bold,
    },
});
