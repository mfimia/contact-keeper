import ContactContext from "../../context/contact/ContactContext";
// importing transitions from react to style adding/deleting/filtering contacts
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fragment, useContext, useEffect } from "react";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  // Contact list will be added on load
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  // If there are no contacts, we tell the user to please add
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  // We are pulling the filtered items from context

  // We wrap the whole thing with the Transition group tag

  return (
    <Fragment>
      {/* If the page is loading, we will see the spinner instead */}
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {/* If filtered has a value, then we map the contacts based on the filtered list. 
      If filtered has no  value, we just map the contacts through the normal contact list */}
          {filtered
            ? filtered.map((contact) => (
                // We wrap the element in CSS transition. The key needs to go in the outer element of the map function
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
