import {configureStore, createSlice} from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

export const mapContacts = contact => {
  const {name, picture, phone, cell, email} = contact;
  return {
    id: uuid(),
    name: name.first + '' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1 ? true : false,
  };
};

const contactsSlide = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
    },
    addFavorite: (state, action) => {
      const phone = action.payload;
      const contact = state.contacts.find(contact => contact.phone === phone);

      contact.favorite = !contact.favorite;
    },
  },
});

export const {fetchContactsSuccess, addFavorite} = contactsSlide.actions;
const Store = configureStore({
  reducer: contactsSlide.reducer,
});
export default Store;
