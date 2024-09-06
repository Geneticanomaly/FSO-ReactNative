import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useDeleteReview = (id) => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
            console.log(error);
        },
    });

    const deleteReview = async ({ id }) => {
        const { data } = await mutate({ variables: { id } });
        return data;
    };

    return [deleteReview, result];
};

export default useDeleteReview;
