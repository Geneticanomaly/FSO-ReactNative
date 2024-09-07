import { StyleSheet, FlatList, View, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import MenuComponent from './MenuComponent';

const RepositoryListContainer = ({ repositories, selectedItem, setSelectedItem, keyword, setKeyword }) => {
    const navigate = useNavigate();

    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    const handlePress = (item) => {
        navigate(`/repository/${item.id}`);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={repositoryNodes}
                ListHeaderComponent={
                    <MenuComponent
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                }
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item)}>
                        <RepositoryItem key={item.id} repository={item} isSingleRepositoryView={false} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default RepositoryListContainer;
