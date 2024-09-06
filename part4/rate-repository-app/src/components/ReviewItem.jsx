import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const convertDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
};

const ReviewItem = ({ review }) => {
    const convertedDate = convertDate(review.createdAt);
    return (
        <View style={styles.container}>
            <View style={styles.rowFlexbox}>
                <View style={styles.ratingContainer}>
                    <Text fontWeight="bold" color="primary" style={{ fontSize: 18 }}>
                        {review.rating}
                    </Text>
                </View>
                <View style={styles.columnFlexbox}>
                    <Text style={{ fontWeight: 'bold' }}>{review.user.username}</Text>
                    <Text style={{ color: theme.colors.textSecondary }}>{convertedDate}</Text>
                </View>
            </View>
            <Text style={{ marginTop: 5 }}>{review.text}</Text>
        </View>
    );
};

export default ReviewItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 10,
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
});
