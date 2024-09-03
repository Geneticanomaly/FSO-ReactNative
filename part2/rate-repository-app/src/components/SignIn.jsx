import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        formik.touched.username && formik.errors.username && styles.errorInput,
                    ]}
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={styles.error}>{formik.errors.username}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        formik.touched.password && formik.errors.password && styles.errorInput,
                    ]}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    secureTextEntry
                />
                {formik.touched.password && formik.errors.password && (
                    <Text style={styles.error}>{formik.errors.password}</Text>
                )}
            </View>
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
    inputContainer: {
        width: '90%',
        marginTop: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        borderRadius: 5,
        fontSize: 16,
    },
    errorInput: {
        borderColor: theme.colors.error,
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
    error: {
        color: theme.colors.error,
        fontSize: 14,
        marginTop: 5,
    },
});
