import { useState, useEffect, createContext } from "react";
import "./styles.css";
import { list } from "./data.js";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Modal from "./component/Model";
import ModalChild from "./component/ModelChild";

import ContactList from "./component/ContactList";

export const contactContext = createContext({});

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentContact, setCurrentContact] = useState({});
  const [tempData, setTempData] = useState({});

  const handleAddOpen = () => {
    setIsOpen(true);
    setModalType("Add");
  };
  const handleEditOpen = (e) => {
    setIsOpen(true);
    setModalType("Edit");
    setCurrentContact(e);
  };
  const handleDeleteOpen = (e) => {
    setIsOpen(true);
    setModalType("Delete");
    setCurrentContact(e);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    setCurrentContact("");
  };

  const handleAddContact = () => {
    setContacts([...contacts, tempData]);
    setIsOpen(false);
    setCurrentContact("");
  };
  const handleEditContact = () => {
    const index = contacts.findIndex((c) => c.id === tempData.id),
      newArr = [...contacts];
    newArr[index] = tempData;
    setContacts(newArr);
    setIsOpen(false);
    setCurrentContact("");
  };
  const handleDeleteContact = () => {
    const newArr = contacts.filter((c) => c.id !== tempData.id);
    setContacts(newArr);
    setIsOpen(false);
    setCurrentContact("");
  };

  const handleNewData = (item) => {
    setTempData(item);
  };

  useEffect(() => {
    setContacts(list);
  }, []);

  return (
    <div className="App">
      <contactContext.Provider
        value={{
          isOpen,
          modalType,
          handleModalClose,
          handleAddContact,
          handleEditOpen,
          handleDeleteOpen
        }}
      >
        <h1>Contact List</h1>
      

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextField
            id="standard-basic"
            label="Search Contact"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddOpen}>
            <AddIcon />
            Add Contact
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <div>
            <ContactList list={contacts} value={searchInput} />
          </div>
        </Grid>

        <Modal
          isOpen={isOpen}
          onAdd={handleAddContact}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          handleClose={handleModalClose}
          title={`${modalType} Contact`}
          type={modalType}
        >
          <ModalChild
            type={modalType}
            item={currentContact}
            onNewData={handleNewData}
          />
        </Modal>
      </contactContext.Provider>
    </div>
  );
};

export default App;
