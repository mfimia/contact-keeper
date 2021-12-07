import React, { useContext } from "react";
import Proptypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open">{email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone">{phone}</i>
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => setCurrent(contact)}
      >
        Edit
      </button>
      <button onClick={onDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: Proptypes.object.isRequired,
};

export default ContactItem;
