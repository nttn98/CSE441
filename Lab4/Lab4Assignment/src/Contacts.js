import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ContactListItem } from './ContactListITem';
import { fetchContactsSuccess, mapContacts } from './Store';

const keyExtrator = ( { phone } ) => phone.toString();
const fetchContacts = async () =>
{
  const data = await fetch( 'https://randomuser.me/api/?results=50' );
  const contactData = await data.json();
  return contactData.results.map( mapContacts );
};

export const Contacts = ( { navigation } ) =>
{
  const { contacts } = useSelector( state => state );
  const dispath = useDispatch();

  useEffect( () =>
  {


    fetchContacts()
      .then( data =>
      {
        dispath( fetchContactsSuccess( data ) );
      } )
      .catch( e =>
      {
        console.error( 'Error fetching contacts:', e );
      } );
  }, [ dispath ] );

  const renderContacts = ( { item } ) =>
  {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={ name }
        avatar={ avatar }
        phone={ phone }
        onPress={ () => navigation.navigate( 'ProfileContact', { contact: item } ) }
      />
    );
  };
  return (
    <View style={ styles.container }>
      <FlatList
        data={ contacts }
        keyExtractor={ keyExtrator }
        renderItem={ renderContacts }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
} );
