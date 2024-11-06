import { useSelector } from "react-redux";
import { ContactThumnail } from "./ContactThumnail";
import { FlatList, StyleSheet, View } from "react-native";

const keyExtrator = ( { phone } ) => phone;
export const Favorites = ( { navigation } ) =>
{
    const { contacts } = useSelector( ( state ) => state );
    const renderFavoriteThumbnail = ( { item } ) =>
    {
        const { avatar } = item;
        return (
            <ContactThumnail avatar={ avatar } onPress={ () => navigation.navigate( 'ProfileContact', { contact: item } ) } />
        )
    }
    const favorites = contacts.filter( ( contact ) => contact.favorite );
    return (
        <View style={ styles.container }>
            <FlatList
                data={ favorites }
                keyExtractor={ keyExtrator }
                numColumns={ 3 }
                contentContainerStyle={ styles.list }
                renderItem={ renderFavoriteThumbnail } />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center'
    }
} )
