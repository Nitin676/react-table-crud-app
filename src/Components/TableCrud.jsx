import React, { useState, Fragment } from "react";
import "../App.css";

// // mock-data.json
import data from "../utils/mock-data.json";
import { nanoid } from "nanoid";

import ReadOnlyRow from "./ReadOnlyRow";
import EditTableRow from "./EditTableRow";



const TableCrud = () => {
  // destructing data here
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
  });

  // console.log("contacts data", contacts);

  // Also use useEffect to get data ::::
  // useEffect(() => {
  //   console.log("useEffect data", contacts);
  // }, [contacts]);

  // editFormDta: - ::::
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
  });

  // EditTableRow: - set initialState for id for editContactId::::
  const [editContactId, setEditContactId] = useState(null);

  // handleAddFormChange ::::
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };

    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  // handleEditFormChange ::::
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  };

  // Clear/Reset the form :::
  const resetAddForm = () => {
    setAddFormData({
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
    });
  };

  // Add the form data (Add a Contact) ::::
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // console.log("addFormData", addFormData);

    // Validate the required fields before submission
    if (!addFormData.name || !addFormData.phone || !addFormData.email || !addFormData.street || !addFormData.city) {
      alert("All Fields are Complusory.");
      return;
    }

    const newContact = { 
      id: nanoid(),
      name: addFormData.name,
      phone: addFormData.phone,
      email: addFormData.email,
      // street: addFormData.street,
      // city: addFormData.city,

      address: {
        street: addFormData.street, // Store the street in the address object
        city: addFormData.city, // Store the city in the address object
      },

    };

    const newContacts = [...contacts, newContact]; // create newContacts Arrays
    setContacts(newContacts); // set values

    // 👇️ Clear the form data after submission // Fields not clearing so resetAddForm added
    alert("Clear the form data after submission");
    setAddFormData({      
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
    });

    // Clear the form data after submission
    resetAddForm();

    // console.log("newContacts", newContacts);
  };

  // handleEditFormSubmit ::::
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // console.log(editFormData);

    // Validate the required fields before submission
    if (!editFormData.name || !editFormData.phone || !editFormData.email || !editFormData.street || !editFormData.city) {
      alert("All Fields are Complusory.");
      return;
    }
    
    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      phone: editFormData.phone,
      email: editFormData.email,
      street: editFormData.street,
      city: editFormData.city,      
    };

    // console.log("editFormData.city --- ", editFormData.city);


    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts); 
    setEditContactId(null);

    // Clear the form data after submission
    setEditFormData({
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
    });

  };


  // handleEditClick ::::
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    // console.log("contact street", contact.address.street); 

    const formValues = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      // street: contact.address.street, 
      // city: contact.address.city,

      street: contact.address?.street || contact.street,
      city: contact.address?.city || contact.city,

      // street: contact.address?.street || contact.street || contact.address.street,
      // city: contact.address?.city || contact.city || contact.address.city,
    };
    setEditFormData(formValues);
    
  };

  // handleCancelClick ::::
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // handleDeleteClick ::::
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };


  return (
    <div className="app-container">
      <div className="table-wrapper">
        <h2 className="fs-1 mb-4 text-center">React Table Crud App</h2>
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                {/* <th className="text-center">#Sr No.</th> */}
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Street</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => ( 
                <Fragment key={contact.id}>
                  {editContactId === contact.id ? (
                    <EditTableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <div className="AddContact card">
        <div className="card-body text-center">
          <h2 className="fs-2">Add a Contact</h2>
          <form className="form mt-3" onSubmit={handleAddFormSubmit}>
            <div className="form-group mb-3">
              <input
                name="name"
                className="form-control"
                type="text"
                placeholder="Name"
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="phone"
                className="form-control"
                type="text"
                placeholder="Phone"
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="email"
                className="form-control"
                type="email"
                placeholder="Email"
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="street"
                className="form-control"
                type="text"
                placeholder="Street"
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="city"
                className="form-control"
                type="text"
                placeholder="City"
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-warning fs-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableCrud;
