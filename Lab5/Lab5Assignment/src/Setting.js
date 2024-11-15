import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function Setting ()
{
    const navigation = useNavigation();

    const handleLogout = async () =>
    {
        try
        {
            await AsyncStorage.clear();
            navigation.navigate( "Login" );
        } catch ( error )
        {
            console.error( "Logout failed:", error );
        }
    };


    return (
        <View style={ style.container }>
            <TouchableOpacity style={ style.btnLogout } onPress={ () => handleLogout() }>
                <Text style={ style.text } >Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create( {
    container: {
        flex: 1,
        margin: 20
    },
    btnLogout: {
        width: '100%',
        height: 50,
        backgroundColor: "#FF6A89",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
} )