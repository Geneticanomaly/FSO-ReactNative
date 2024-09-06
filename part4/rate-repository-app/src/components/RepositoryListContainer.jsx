import { StyleSheet, FlatList, View, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import MenuComponent from './MenuComponent';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, selectedItem, setSelectedItem }) => {
    const navigate = useNavigate();

    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    const handlePress = (item) => {
        navigate(`/repository/${item.id}`);
    };

    return (
        <View>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={
                    <MenuComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
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
