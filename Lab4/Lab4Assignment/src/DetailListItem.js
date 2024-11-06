import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export const DetailListItem = ( { icon, title, subtitle } ) =>
{
    return (
        <View style={ styles.container }>
            <View style={ styles.textContainer }>
                <Text style={ styles.title }>{ title }</Text>
                <Text style={ styles.subtitle }>{ subtitle }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
    },
} );

