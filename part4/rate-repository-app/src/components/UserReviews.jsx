import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const UserReviews = () => {
    const { data, loading } = useQuery(ME, {
        variables: { includeReviews: true },
    });

    if (loading) return <Text>Loading...</Text>;

    const reviews = data ? data.me.reviews.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
        ></FlatList>
    );
};

export default UserReviews;
