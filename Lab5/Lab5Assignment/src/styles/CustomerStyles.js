import { StyleSheet } from "react-native";

export const CustomerStyles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5',
    },
    customer: {
        borderRadius: '15%'
    },
    totalMoney: {
        color: "#FF6A89",
        fontWeight: "bold"
    },
    btnAddCustomer: {
        width: 50,
        height: 50,
        backgroundColor: '#FF6A89',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 5,
        right: 20,
    },
    plusText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }
} )