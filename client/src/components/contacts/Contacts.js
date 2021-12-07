import ContactContext from "../../context/contact/ContactContext";
import { Fragment, useContext } from "react";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  // If there are no contacts, we tell the user to please add
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  // We are pulling the filtered items from context

  return (
    <Fragment>
      {/* If filtered has a value, then we map the contacts based on the filtered list. 
      If filtered has no  value, we just map the contacts through the normal contact list */}
      {filtered
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </Fragment>
  );
};

export default Contacts;
