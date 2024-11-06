import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import { Text } from "react-native-paper"

export const ContactThumnail = ( { name, phone, avatar, textColor, onPress } ) =>
{
    const colorStyle = {
        console: textColor,
    }
    const ImageContact = onPress ? TouchableOpacity : View;
    return (
        <View style={ styles.container }>
            <ImageContact onPress={ onPress }>
                <Image source={ { uri: avatar } }
                    style={ styles.avatar } />
            </ImageContact>
            { name !== '' && <Text style={ [ styles.name, colorStyle ] }>{ name }</Text> }
            { phone !== '' && phone !== undefined && (
                <View style={ styles.phoneSection }>
                    <Icon name='phone' size={ 16 } style={ { color: textColor } } />
                    <Text style={ [ styles.phone, colorStyle ] }> { phone }</Text>
                </View>
            ) }
        </View>
    )
}

ContactThumnail.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
    onPress: PropTypes.func
}

ContactThumnail.defaulProps = {
    name: '',
    phone: '',
    textColor: 'white',
    onPress: null,
}

const styles = StyleSheet.create( {
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: "row",
        marginTop: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    phone: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold'
    }
} )