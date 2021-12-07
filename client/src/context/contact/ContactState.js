import { useReducer, useState } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Loko Loks",
        email: "lok@email.com",
        phone: "665 11 11 11",
        type: "personal",
      },
      {
        id: 2,
        name: "Chulo chul",
        email: "chul@email.com",
        phone: "665 22 22 22",
        type: "personal",
      },
      {
        id: 3,
        name: "Perro dog",
        email: "perru@email.com",
        phone: "665 33 33 33",
        type: "professional",
      },
    ],
    // Current represents the contact card that has been selected
    // We put in "on stage" and make edits to it
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = Math.floor(Math.random() * 10000);
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
