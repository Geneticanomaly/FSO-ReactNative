import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
    const [selectedItem, setSelectedItem] = useState('Select an item...');
    const [keyword, setKeyword] = useState('');
    const { repositories } = useRepositories(selectedItem, keyword);

    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            keyword={keyword}
            setKeyword={setKeyword}
        />
    );
};

export default RepositoryList;
