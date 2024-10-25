import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create( {
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    productItem: {
        flexDirection: 'row',
        flex: 1,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 3,
        width: '75%'
    },
    productImage: {
        width: '25%',
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDiscount: {
        color: 'green',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 35,
        marginTop: 15
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 10,
    },

} );
