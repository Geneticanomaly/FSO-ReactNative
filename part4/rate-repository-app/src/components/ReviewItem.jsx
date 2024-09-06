import { View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const convertDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
};

const ReviewItem = ({ review, isMyReviews, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const convertedDate = convertDate(review.createdAt);

    const remove = async (id) => {
        await deleteReview({ id });
        refetch();
    };

    const handleDelete = (review) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'DELETE', onPress: () => remove(review.id) },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.rowFlexbox}>
                <View style={styles.ratingContainer}>
                    <Text fontWeight="bold" color="primary" style={{ fontSize: 18 }}>
                        {review.rating}
                    </Text>
                </View>
                <View style={styles.columnFlexbox}>
                    <Text style={{ fontWeight: 'bold' }}>{review.repository.fullName}</Text>
                    <Text style={{ color: theme.colors.textSecondary }}>{convertedDate}</Text>
                </View>
            </View>
            <Text style={{ marginTop: 5 }}>{review.text}</Text>
            {isMyReviews && (
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigate(`/repository/${review.repository.id}`)}
                    >
                        <Text style={styles.text}>View repository</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, { backgroundColor: '#ED2939' }]}
                        onPress={() => handleDelete(review)}
                    >
                        <Text style={styles.text}>Delete review</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default ReviewItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 15,
    },
    rowFlexbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    columnFlexbox: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
        gap: 5,
    },
    ratingContainer: {
        borderWidth: 2,
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    button: {
        width: '47.5%',
        padding: 15,
        marginTop: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: theme.fontWeights.bold,
    },
});
