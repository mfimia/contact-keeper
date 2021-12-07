// Since this is a form, we need some component-level state
import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, current, updateContact } = contactContext;

  useEffect(() => {
    current
      ? setContact(current)
      : setContact({
          name: "",
          email: "",
          phone: "",
          type: "personal",
        });
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    !current ? addContact(contact) : updateContact(contact);
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button onClick={clearAll} className="btn btn-light btn-block">
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
