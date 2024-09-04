import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: 'white',
        gap: 10,
    },
    header: {
        paddingLeft: 15,
    },
    ratings: {
        justifyContent: 'center',
        gap: 40,
        paddingBottom: 20,
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
});

const RepositoryItem = ({ repository }) => {
    const roundToOneDecimal = (number) => {
        return (number / 1000).toFixed(1) + 'k';
    };

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

            <View style={[styles.rowFlexbox, styles.ratings]}>
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
        </View>
    );
};

export default RepositoryItem;
