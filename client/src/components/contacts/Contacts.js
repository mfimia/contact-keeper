import ContactContext from "../../context/contact/ContactContext";
// importing transitions from react to style adding/deleting/filtering contacts
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
      {/* We wrap the whole thing with the Transition group tag */}
      <TransitionGroup>
        {/* If filtered has a value, then we map the contacts based on the filtered list. 
      If filtered has no  value, we just map the contacts through the normal contact list */}
        {filtered
          ? filtered.map((contact) => (
              // We wrap the element in CSS transition. The key needs to go in the outer element of the map function
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
