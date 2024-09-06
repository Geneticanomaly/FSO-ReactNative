import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
    const [selectedItem, setSelectedItem] = useState('Select an item...');
    const { repositories } = useRepositories(selectedItem);

    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
        />
    );
};

export default RepositoryList;
