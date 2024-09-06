import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedItem) => {
    const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
        variables: {
            orderBy:
                selectedItem === 'Highest rated repositories'
                    ? 'RATING_AVERAGE'
                    : selectedItem === 'Lowest rated repositories'
                    ? 'RATING_AVERAGE'
                    : 'CREATED_AT',
            orderDirection: selectedItem === 'Lowest rated repositories' ? 'ASC' : 'DESC',
        },
        fetchPolicy: 'cache-and-network',
    });

    return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
