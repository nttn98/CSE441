import { StyleSheet } from "react-native";

export const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    displayContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'flex-end',
    },
    displayText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 32,
        color: '#000',
    },
} );
