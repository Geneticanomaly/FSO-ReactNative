import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const RepositoryItem = ({ repository, isSingleRepositoryView }) => {
    const roundToOneDecimal = (number) => {
        return (number / 1000).toFixed(1) + 'k';
    };

    const id = useParams().id;

    if (isSingleRepositoryView) {
        const { data, loading } = useQuery(GET_REPOSITORY, {
            fetchPolicy: 'cache-and-network',
            variables: { id: id },
        });

        if (loading) return <Text>Loading...</Text>;

        repository = data.repository;
    }

    return (
        <View testID="repositoryItem" style={styles.container}>
            <View style={[styles.rowFlexbox, styles.header]}>
                <Image style={styles.logo} source={{ uri: repository.ownerAvatarUrl }} />
                <View style={[styles.columnFlexbox]}>
                    <Text fontWeight="bold">{repository.fullName}</Text>
                    <Text>{repository.description}</Text>
                    <Text style={styles.language}>{repository.language}</Text>
                </View>
            </View>

            <View
                style={[
                    styles.rowFlexbox,
                    { justifyContent: 'center', gap: 40, paddingBottom: isSingleRepositoryView ? 5 : 20 },
                ]}
            >
                <View style={[styles.columnFlexbox, styles.ratingElement]}>
                    <Text fontWeight="bold">
                        {repository.stargazersCount >= 1000
                            ? roundToOneDecimal(repository.stargazersCount)
                            : repository.stargazersCount}
                    </Text>
                    <Text>Stars</Text>
                </View>

                <View style={[styles.columnFlexbox, styles.ratingElement]}>
                    <Text fontWeight="bold">
                        {repository.forksCount >= 1000
                            ? roundToOneDecimal(repository.forksCount)
                            : repository.forksCount}
                    </Text>
                    <Text>Forks</Text>
                </View>
                <View style={[styles.columnFlexbox, styles.ratingElement]}>
                    <Text fontWeight="bold">{repository.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={[styles.columnFlexbox, styles.ratingElement]}>
                    <Text fontWeight="bold">{repository.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
            {isSingleRepositoryView && (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
                        <Text style={styles.text}>Open in Github</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default RepositoryItem;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: 'white',
        gap: 10,
        width: '100%',
    },
    header: {
        paddingLeft: 15,
    },
    ratingElement: {
        alignItems: 'center',
    },
    rowFlexbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'top',
        gap: 20,
    },
    columnFlexbox: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
        gap: 5,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    language: {
        padding: 5,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        color: 'white',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: theme.fontWeights.bold,
    },
});
