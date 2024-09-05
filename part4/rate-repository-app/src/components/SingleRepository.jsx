import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

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

const convertDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
};

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem repository={repository} isSingleRepositoryView={true} />;
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

const SingleRepository = () => {
    const id = useParams().id;
    const { data, loading } = useQuery(GET_REPOSITORY_REVIEWS, {
        variables: { id: id },
    });

    if (loading) return <Text>Loading...</Text>;

    const reviews = data ? data.repository.reviews.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
        ></FlatList>
    );
};

export default SingleRepository;
