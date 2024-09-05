import useCreateReview from '../hooks/useCreateReview';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-native';

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;
        try {
            const {
                createReview: { repositoryId },
            } = await createReview({ repositoryName, ownerName, rating: Number(rating), text });
            navigate(`/repository/${repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };
    return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
