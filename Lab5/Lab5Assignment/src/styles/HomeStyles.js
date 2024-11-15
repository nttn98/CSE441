import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#FF6A89',
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logoText: {
        fontSize: 24,
        color: '#FF6A89',
        fontWeight: 'bold',
    },
    serviceList: {
        paddingHorizontal: 15,
    },
    card: {
        marginVertical: 5,
        borderRadius: 10,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '700',
    },
    servicePrice: {
        fontSize: 16,
        color: '#333',
    },
    middle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    circleButton: {
        backgroundColor: '#FF6A89',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 0,
    },

} );

