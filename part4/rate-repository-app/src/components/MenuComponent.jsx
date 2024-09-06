import { View, Pressable, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import theme from '../theme';
import { TextInput } from 'react-native-paper';

const MenuComponent = ({ selectedItem, setSelectedItem, keyword, setKeyword }) => {
    return (
        <View style={{ width: '100%' }}>
            <TextInput
                style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
                mode="outlined"
                placeholder="Type something"
                value={keyword}
                onChangeText={(text) => setKeyword(text)}
                left={<TextInput.Icon icon="magnify" />}
                right={<TextInput.Icon icon="close" onPress={() => setKeyword('')} />}
            />
            <List.AccordionGroup>
                <List.Accordion
                    title={selectedItem}
                    id="1"
                    style={{ backgroundColor: '#DCDCDC', paddingLeft: 5 }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderColor: theme.colors.textSecondary,
                            marginBottom: 5,
                        }}
                    >
                        <Divider />
                        <Pressable onPress={() => setSelectedItem('Latest repositories')}>
                            <List.Item title="Latest repositories" titleStyle={{ fontWeight: 'bold' }} />
                        </Pressable>
                        <Divider />
                        <Pressable onPress={() => setSelectedItem('Highest rated repositories')}>
                            <List.Item
                                title="Highest rated repositories"
                                titleStyle={{ fontWeight: 'bold' }}
                            />
                        </Pressable>
                        <Divider />
                        <Pressable onPress={() => setSelectedItem('Lowest rated repositories')}>
                            <List.Item
                                title="Lowest rated repositories"
                                titleStyle={{ fontWeight: 'bold' }}
                            />
                        </Pressable>
                    </View>
                </List.Accordion>
            </List.AccordionGroup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    menuButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default MenuComponent;
