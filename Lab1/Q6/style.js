import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignitem: 'center',
        padding: 48,
    },
    title: {
        fontSize: 48, fontWeight: 'bold', color: '#EF506B', marginBottom: 24, marginTop: 72,
    },
    input: {
        borderColor: '#EF506B',
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 12,
    },
    button: {
        backgroundColor: '#EF506B',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        padding: 12,
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
} )