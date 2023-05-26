import React from "react";

import List from "@material-ui/core/List";

import ContactListItem from "./ContactListItem";

const ContactList = ({ list, value }) => {
  return (
    <>
      <List>
        {list &&
          list
            .filter(
              (f) =>
                f.name.toLowerCase().includes(value.toLowerCase()) ||
                f.name === ""
            )
            .map((person, key) => <ContactListItem item={person} key={key} />)}
      </List>
    </>
  );
};

export default ContactList;
