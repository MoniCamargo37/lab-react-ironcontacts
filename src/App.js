import "./App.css";
import React, { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const [availableContacts, setAvailableContacts] = useState(contacts.slice(5));

  const handleAddRandomContact = () => {
    if(availableContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableContacts.length);
      const randomContact = availableContacts[randomIndex];
      setContactList(prevContactList => [...prevContactList, randomContact]);
      setAvailableContacts(prevAvailableContacts => prevAvailableContacts.filter(contact => contact !== randomContact));
    }
  };
  
  const handleSortByName = () => {
    const sortedContacts = contactList.sort((a, b) => a.name.localeCompare(b.name));
    setContactList([...sortedContacts]);
  };

  const handleSortByPopularity = () => {
    const sortedContacts = contactList.sort((a, b) => b.popularity - a.popularity);
    setContactList([...sortedContacts]);
  };

  const handleRemoveContact = (id) => {
    const updatedContactList = contactList.filter(contact => contact.id !== id);
    setContactList([...updatedContactList]);
  };

  return (
    <div>
      <h1>IronContacts</h1>
      <div className="btnTop">
        <button onClick={handleAddRandomContact}>Add Random Contact</button>
        <button onClick={handleSortByName}>Sort by Name</button>
        <button onClick={handleSortByPopularity}>Sort by Popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {/* This maps over the contact list and displays each contact in a row */}
          {contactList.map(({ id, name, pictureUrl, popularity, wonOscar, wonEmmy }) => (
            <tr key={id}>
              <td>
                <img src={pictureUrl} alt={name} height="150" width="100"/>
              </td>
              <td>{name}</td>
              {/* This formats the popularity property to two decimal places.*/}
              <td>{popularity.toFixed(2)}</td>
              <td>{wonOscar ? <span role="img" aria-label="Trophy">🏆</span> : null}</td>
              <td>{wonEmmy ? <span role="img" aria-label="Trophy">🏆</span> : null}</td>
              <td>
                <button onClick={() => handleRemoveContact(id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
