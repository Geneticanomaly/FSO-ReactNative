import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem repository={repository} isSingleRepositoryView={true} />;
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
