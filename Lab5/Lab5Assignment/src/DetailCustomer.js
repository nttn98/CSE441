import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Divider, IconButton, Menu, Text } from "react-native-paper";
import { formatDate, formatPrice } from "./styles/format";
import { HomeStyles } from "./styles/HomeStyles";

export default function DetailCustomer ( { route, navigation } )
{
    const [ customer, setCustomer ] = useState( '' );
    const [ token, setToken ] = useState( '' );
    const [ transaction, setTransactions ] = useState( [] );
    const isFocus = useIsFocused();

    // Function to toggle the menu
    const [ visible, setVisible ] = useState( false );
    const openMenu = () => setVisible( true );
    const closeMenu = () => setVisible( false );

    const getUserData = async () =>
    {
        try
        {
            const tempId = route.params.id;
            if ( tempId )
            {
                const respone = await axios.get( `https://kami-backend-5rs0.onrender.com/customers/${ tempId }` );
                setCustomer( respone.data );
                setTransactions( customer.transactions );
            }
        } catch ( error )
        {
            console.error( "Failed to load user data:", error );
        }
    }
    useEffect( () =>
    {

        if ( !isFocus )
        {
            closeMenu();
        } else
        {
            const tempToken = route.params.token;
            if ( tempToken )
            {
                setToken( tempToken );
            }
            getUserData();
        }

    }, [ isFocus ] )


    const handleEdit = ( id ) =>
    {
        if ( id !== null )
        {
            navigation.navigate( "EditCustomer", { id, token } );
        }
    }


    const handleDelete = async ( id ) =>
    {
        try
        {
            await axios.delete( `https://kami-backend-5rs0.onrender.com/customers/${ id }`, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            } );
            console.log( `Delete customer ${ id } successful` );

        } catch ( error )
        {
            console.error( 'Error delete customer:', error );
        } finally
        {
            navigation.goBack();
        }
    };

    const renderCustomerInfo = () => (
        <View style={ styles.content }>
            <Text style={ styles.sectionTitle }>General information</Text>
            <Text style={ styles.infoText }>
                Name: <Text style={ styles.valueText }>{ customer.name ?? customer.name }</Text>
            </Text>
            <Text style={ styles.infoText }>
                Phone: <Text style={ styles.valueText }>{ customer.phone ?? customer.phone }</Text>
            </Text>
            <Text style={ styles.infoText }>
                Total spent: <Text style={ styles.valueText }>{ formatPrice( customer.totalSpent ?? customer.totalSpent ) }</Text>
            </Text>
            <Text style={ styles.infoText }>
                Time: <Text style={ styles.valueText }>{ formatDate( customer.createdAt ?? customer.createdAt ) }</Text>
            </Text>
            <Text style={ styles.infoText }>
                Last update: <Text style={ styles.valueText }>{ formatDate( customer.updatedAt ?? customer.updatedAt ) }</Text>
            </Text>
        </View>
    );

    const renderTransaction = ( { item } ) => (
        <View style={ styles.transactionCard }>
            <View style={ styles.transactionDetails }>
                <Text variant="labelSmall" style={ styles.transactionId }>{ item.id } - { formatDate( item.createdAt ) }</Text>
                <FlatList
                    data={ item.services }
                    renderItem={ ( { item } ) =>
                    {
                        return (
                            <View style={ { width: '50 %' } }>
                                <Text style={ styles.transactionDescription }>- { item.name }</Text>
                            </View>
                        )
                    }
                    }
                    keyExtractor={ ( service ) => service._id }
                />

            </View>
            <Text style={ styles.transactionPrice }>{ formatPrice( item.price ) }</Text>
        </View>
    );

    return (
        <View style={ styles.container }>
            {/* Header */ }
            <Appbar.Header style={ HomeStyles.header }>
                <Appbar.BackAction color="white" onPress={ () => navigation.goBack() } />
                <Appbar.Content title="DetailCustomer" color="white" titleStyle={ { fontWeight: 900 } } />
                <Menu
                    visible={ visible }
                    onDismiss={ closeMenu }
                    anchor={ <IconButton icon="dots-vertical" onPress={ openMenu } size={ 30 } iconColor="white"
                    /> }
                >
                    <Divider />
                    <Menu.Item onPress={ () => handleEdit( customer._id ) } title="Edit" />
                    <Menu.Item onPress={ () => handleDelete( customer._id ) } title="Delete" />
                </Menu>

            </Appbar.Header>
            <View style={ { padding: 15 } }>
                { renderCustomerInfo() }
                <View style={ styles.content }>
                    <Text style={ styles.sectionTitle }>Transaction history</Text>
                    <FlatList
                        data={ transaction }
                        renderItem={ renderTransaction }
                        keyExtractor={ ( item ) => item._id }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        // padding: 15,
        backgroundColor: "#fff",
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        margin: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FF6A89",
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    valueText: {
        fontWeight: "bold",
        color: "#000",
    },
    transactionCard: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 10
    },
    transactionDetails: {
        flex: 1,
        marginRight: 10,
    },
    transactionId: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#333",
    },
    transactionDate: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
    },
    transactionDescription: {
        fontSize: 14,
        color: "#444",
        marginBottom: 2,
    },
    transactionPrice: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#FF6A89",
        justifyContent: "center"
    },
} );
