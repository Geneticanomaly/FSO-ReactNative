import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import Text from './Text';
import ReviewItem from './ReviewItem';
import { useState } from 'react';

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem repository={repository} isSingleRepositoryView={true} />;
};

const SingleRepository = () => {
    const [first] = useState(4);
    const id = useParams().id;
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
        variables: { id: id, first },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Text>Loading...</Text>;

    const reviews = data ? data.repository.reviews.edges.map((edge) => edge.node) : [];
    const pageInfo = data.repository.reviews.pageInfo;

    const onEndReach = () => {
        if (!pageInfo.hasNextPage) return;

        fetchMore({
            variables: {
                first,
                after: pageInfo.endCursor,
            },
            updateQuery: (prevState, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevState;

                return {
                    repository: {
                        ...prevState.repository,
                        reviews: {
                            ...prevState.repository.reviews,
                            edges: [
                                ...prevState.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                            pageInfo: fetchMoreResult.repository.reviews.pageInfo,
                        },
                    },
                };
            },
        });

        console.log('You have reached the end of the list');
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} isMyReviews={false} refetch={{}} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0}
        ></FlatList>
    );
};

export default SingleRepository;
