import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Checkbox, Text } from "react-native-paper";
import { formatPrice } from "./styles/format";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function AddTransaction ( { route, navigation } )
{
    const token = route.params.token;
    const [ customers, setCustomers ] = useState( [] );
    const [ services, setServices ] = useState( [] );
    const [ selectedServices, setSelectedServices ] = useState( {} );
    const [ users, setUsers ] = useState( [] );

    const [ total, setTotal ] = useState( 0 );
    const [ customerId, setCustomerId ] = useState( '' );

    useEffect( () =>
    {
        const getCustomers = async () =>
        {
            try
            {
                const response = await axios.get( `https://kami-backend-5rs0.onrender.com/customers` );
                setCustomers( response.data );
            } catch ( error )
            {
                console.error( "Error fetching customers:", error );
                setCustomers( [] );
            }
        }
        getCustomers();

        const getServices = async () =>
        {
            try
            {
                const response = await axios.get( `https://kami-backend-5rs0.onrender.com/services` );
                setServices( response.data );
            } catch ( error )
            {
                console.error( "Error fetching services:", error );
                setServices( [] );
            }
        }
        getServices();

        const getStaffs = async () =>
        {
            try
            {
                const response = await axios.get( `https://kami-backend-5rs0.onrender.com/users` );
                setUsers( response.data );
            } catch ( error )
            {
                console.error( "Error fetching services:", error );
                setUsers( [] );
            }
        }
        getStaffs();
    }, [] )

    // Handle checkbox toggle
    const handleServiceToggle = ( service ) =>
    {
        const isSelected = selectedServices[ service._id ];
        const updatedSelection = { ...selectedServices };
        if ( isSelected )
        {
            delete updatedSelection[ service._id ];
        } else
        {
            updatedSelection[ service._id ] = { ...service, quantity: 1, userID: null };
        }
        setSelectedServices( updatedSelection );
        calculateTotal( updatedSelection );
    };

    // Handle quantity change
    const handleQuantityChange = ( serviceId, delta ) =>
    {
        const updatedSelection = { ...selectedServices };
        const service = updatedSelection[ serviceId ];
        service.quantity = Math.max( 1, service.quantity + delta );
        setSelectedServices( updatedSelection );
        calculateTotal( updatedSelection );
    };

    // Calculate total price
    const calculateTotal = ( selection ) =>
    {
        const totalPrice = Object.values( selection ).reduce( ( sum, service ) =>
        {
            return sum + service.price * service.quantity;
        }, 0 );
        setTotal( totalPrice );
    };

    const handleAddTransaction = async () =>
    {
        console.log( token );

        if ( Object.keys( selectedServices ).length === 0 )
        {
            Alert.alert( "Error", "You need to select at least one service." );
            return;
        }
        if ( !customerId )
        {
            Alert.alert( "Error", "You need to choose a customer." );
            return;
        }

        const formattedServices = Object.values( selectedServices ).map( service => ( {
            _id: service._id,
            quantity: service.quantity,
            userID: service.userID,
        } ) );

        try
        {
            console.log( "Payload:", {
                customerId: customerId,
                services: formattedServices,
            } );

            const response = await axios.post(
                `https://kami-backend-5rs0.onrender.com/transactions`,
                {
                    customerId: customerId,
                    services: formattedServices,
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    },
                }
            );

            Alert.alert(
                "Transaction added successfully",
                "Go back to home page",
                [
                    {
                        text: "OK",
                        onPress: () =>
                        {
                            navigation.navigate( "Home" );
                        },
                    },
                ]
            );
        } catch ( error )
        {
            console.error( "Error adding transaction:", error.response?.data || error );
            Alert.alert(
                "Error",
                `Failed to add transaction: ${ error.response?.data?.message || "Server error" }`
            );
        }
    };

    return (
        <ScrollView style={ styles.container }>
            <Text style={ styles.title }>Customer *</Text>
            <Dropdown
                placeholder="Select customer"
                style={ styles.dropdown }
                data={ customers }
                labelField="name"
                valueField="_id"
                value={ customerId }
                onChange={ c =>
                {
                    setCustomerId( c._id )
                } }
            />

            <Text style={ styles.subtitle }>Available Services</Text>
            { services.map( ( service ) =>
            {
                const isSelected = selectedServices[ service._id ];
                return (
                    <View key={ service._id } style={ styles.serviceItem }>
                        <Checkbox
                            status={ isSelected ? "checked" : "unchecked" }
                            onPress={ () => handleServiceToggle( service ) }
                        />
                        <View style={ styles.serviceDetails }>
                            <Text style={ styles.serviceName }>{ service.name }</Text>
                            { isSelected && (
                                <>
                                    <View style={ styles.quantityControls }>
                                        <TouchableOpacity
                                            style={ styles.quantityButton }
                                            onPress={ () => handleQuantityChange( service._id, -1 ) }
                                        >
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                        <Text style={ styles.quantityText }>
                                            { selectedServices[ service._id ]?.quantity }
                                        </Text>
                                        <TouchableOpacity
                                            style={ styles.quantityButton }
                                            onPress={ () => handleQuantityChange( service._id, 1 ) }
                                        >
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={ styles.servicePrice }>
                                        Price: { formatPrice( service.price ) }
                                    </Text>

                                    <Dropdown
                                        style={ styles.executorDropdown }
                                        placeholder="Executor"
                                        data={ users }
                                        labelField="name"
                                        valueField="_id"
                                        value={ selectedServices[ service._id ]?.userID || null }
                                        onChange={ ( s ) =>
                                        {
                                            const updatedServices = {
                                                ...selectedServices,
                                                [ service._id ]: {
                                                    ...selectedServices[ service._id ],
                                                    userID: s._id,
                                                },
                                            };
                                            setSelectedServices( updatedServices );
                                        } }
                                    />
                                </>
                            ) }
                        </View>
                    </View>
                );
            } ) }
            <Button
                style={ styles.summaryButton }
                mode="contained"
                onPress={ () => handleAddTransaction() }
            >
                See Summary:  ({ formatPrice( total ) })
            </Button>
        </ScrollView>
    )

}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
    },
    dropdown: {
        marginVertical: 10,
        height: 50,
        padding: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
    },
    button: {
        borderRadius: 10,
        marginBottom: 50,
    },
    buttonContent: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
    },
    serviceItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    serviceDetails: {
        flex: 1,
        marginLeft: 10,
    },
    serviceName: {
        fontSize: 16,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    executorDropdown: {
        marginVertical: 10,
        width: 200,
        height: 50,
        padding: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
    },
    servicePrice: {
        marginTop: 5,
        fontSize: 16,
        color: "#888",
    },
    summaryButton: {
        marginTop: 20,
    },
} );