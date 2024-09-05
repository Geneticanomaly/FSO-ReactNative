import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating min is 0')
        .max(100, 'Rating max is 100'),
    text: yup.string().optional(),
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const ReviewForm = ({ onSubmit }) => {
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
                        formik.touched.ownerName && formik.errors.ownerName && styles.errorInput,
                    ]}
                    placeholder="Repository owner name"
                    value={formik.values.ownerName}
                    onChangeText={formik.handleChange('ownerName')}
                />
                {formik.touched.ownerName && formik.errors.ownerName && (
                    <Text style={styles.error}>{formik.errors.ownerName}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        formik.touched.repositoryName && formik.errors.repositoryName && styles.errorInput,
                    ]}
                    placeholder="Repository name"
                    value={formik.values.repositoryName}
                    onChangeText={formik.handleChange('repositoryName')}
                />
                {formik.touched.repositoryName && formik.errors.repositoryName && (
                    <Text style={styles.error}>{formik.errors.repositoryName}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, formik.touched.rating && formik.errors.rating && styles.errorInput]}
                    placeholder="Rating between 0 and 100"
                    value={formik.values.rating}
                    onChangeText={formik.handleChange('rating')}
                />
                {formik.touched.rating && formik.errors.rating && (
                    <Text style={styles.error}>{formik.errors.rating}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Review"
                    value={formik.values.text}
                    onChangeText={formik.handleChange('text')}
                    multiline={true}
                />
            </View>
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.text}>Create a review</Text>
            </Pressable>
        </View>
    );
};

export default ReviewForm;

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
