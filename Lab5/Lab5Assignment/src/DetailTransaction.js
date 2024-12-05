import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Divider, IconButton, Menu, Text } from "react-native-paper";
import { formatDate, formatPrice } from "./styles/format";
import { useNavigation } from "@react-navigation/native";
import { HomeStyles } from "./styles/HomeStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailTransaction ( { route } )
{
    const transaction = route.params;
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( '' );

    const [ visible, setVisible ] = useState( false );
    const openMenu = () => setVisible( true );
    const closeMenu = () => setVisible( false );


    useEffect( () =>
    {
        const getUserData = async () =>
        {
            try
            {
                const authToken = await AsyncStorage.getItem( "authToken" );
                setToken( authToken );

            } catch ( error )
            {
                console.error( "Failed to load user data:", error );
            }
        }
        getUserData();

        if ( transaction && ( transaction.id !== null || transaction.id !== undefined ) )
        {
            setLoading( false );
        } else
        {
            navigation.navigate( "Transactions" );
        }
    }, [] )

    if ( loading )
    {
        return (
            <View>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        );
    }

    const handleCancelTransaction = () =>  
    {
        Alert.alert(
            "Warning",
            "Are you sure you want to cancel this transaction?",
            [
                {
                    text: "Delete",
                    onPress: async () =>
                    {
                        try
                        {
                            await axios.delete(
                                `https://kami-backend-5rs0.onrender.com/transactions/${ transaction._id }`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${ token }`,
                                    },
                                }
                            );
                            Alert.alert( "Transaction deleted successfully." );
                            [
                                {
                                    text: "OK",
                                    onPress: () => navigation.goBack(), s
                                },
                            ]
                        } catch ( error )
                        {
                            Alert.alert(
                                "Error",
                                "Failed to delete the transaction. Please try again later."
                            );
                            console.error( error );
                        }
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => { },
                },
            ]
        );
    }

    return (
        <View>
            <View>
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
                        <Menu.Item onPress={ () => '' } title="See more detail" />
                        <Menu.Item onPress={ () => handleCancelTransaction() } title="Cancel transaction" />
                    </Menu>

                </Appbar.Header>
            </View>
            <View style={ style.container }>
                <View style={ style.content }>
                    <Text style={ style.subHeaderText }>General information</Text>
                    <View style={ style.inlineRow }>
                        <Text>Transaction code</Text>
                        <Text style={ style.rightText }>{ transaction.id }</Text>
                    </View>
                    <View style={ style.inlineRow }>
                        <Text>Customer</Text>
                        <Text style={ style.rightText }>{ transaction.customer.name }</Text>
                    </View>
                    <View style={ style.inlineRow }>
                        <Text>Creation time</Text>
                        <Text style={ style.rightText }>{ formatDate( transaction.createdAt ) }</Text>
                    </View>
                </View>

                <View style={ style.content }>
                    <Text style={ style.subHeaderText }>Services list</Text>
                    <FlatList
                        data={ transaction.services }
                        renderItem={ ( { item } ) =>
                        {
                            return (
                                <View style={ style.inlineRow }>
                                    <Text style={ { width: '40%' } } >{ item.name }</Text>
                                    <Text>x{ item.quantity }</Text>
                                    <Text style={ style.rightText } >{ formatPrice( item.price ) }</Text>
                                </View>
                            )
                        } }
                        keyExtractor={ ( service ) => service._id } />
                    <Divider style={ { marginVertical: 5 } } />
                    <View style={ [ style.inlineRow, { marginTop: 15 } ] }>

                        <Text style={ { color: 'gray' } }>Total</Text>
                        <Text style={ style.rightText }>{ formatPrice( transaction.price ) }</Text>
                    </View>
                </View>


                <View style={ style.content }>
                    <Text style={ style.subHeaderText }>Cost</Text>
                    <View style={ style.inlineRow }>
                        <Text>Amount of money</Text>
                        <Text style={ style.rightText }>{ formatPrice( transaction.priceBeforePromotion ) }</Text>
                    </View>
                    <View style={ style.inlineRow }>
                        <Text>Discount</Text>
                        <Text style={ style.rightText }>{ formatPrice( transaction.priceBeforePromotion - transaction.price ) }</Text>
                    </View>
                    <Divider style={ { marginVertical: 5 } } />
                    <View style={ [ style.inlineRow, { marginTop: 20 } ] }>
                        <Text style={ { fontWeight: 'bold', fontSize: 22 } }>Total payment</Text>
                        <Text style={ [ style.rightText, { color: "#FF6A89", fontSize: 24 } ] }>{ formatPrice( transaction.price ) }</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

const style = StyleSheet.create(
    {
        container: {
            flexDirection: 'column',
            padding: 20,
        },
        content: {
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 10,
            margin: 5,
            elevation: 5,
        },
        inlineRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
        },
        rightText: {
            fontWeight: 'bold'
        },
        subHeaderText: {
            color: "#FF6A89",
            fontWeight: 'bold',
            paddingBottom: 5
        }
    }
)