import { StyleSheet, Touchable, View } from "react-native"
import { ContactThumnail } from "./ContactThumnail";
import { IconButton } from "react-native-paper";
import { DetailListItem } from "./DetailListItem";
import { addFavorite } from "./Store";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

export const ProfileContact = ( { route } ) =>
{

    const { contact } = route.params;
    const { id, avatar, name, email, phone, cell, favorite } = contact;
    const dispath = useDispatch();
    const navigation = useNavigation();

    return (
        <View style={ styles.container }>
            <View style={ styles.avatarSection }>
                <ContactThumnail avatar={ avatar } name={ name } phone={ phone }></ContactThumnail>
            </View>
            <View style={ styles.detailsSection }>
                <DetailListItem icon="mail" title="Email" subtitle={ email } />
                <DetailListItem icon="phone" title="Work" subtitle={ phone } />
                <DetailListItem icon="smartphone" title="Personal" subtitle={ cell } />
                <View style={ { alignItems: 'center' } }>
                    <IconButton
                        icon={ favorite == true ? "star-check" : "star-check-outline" }
                        iconColor="#663399"
                        size={ 20 }
                        onPress={ () =>
                        {
                            dispath( addFavorite( phone ) );
                            navigation.goBack();
                        } }
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white'
    }
} )