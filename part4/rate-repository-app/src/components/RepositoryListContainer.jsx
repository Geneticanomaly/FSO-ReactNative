import { StyleSheet, FlatList, View } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem key={item.id} repository={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

export default RepositoryListContainer;
