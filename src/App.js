import { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import ContactsList from './components/List/List';
import Filter from './components/Filter/Filter';
import { FirstTitle, SecondTitle } from './App.styled';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const contactsListDefault = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? contactsListDefault
    );
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const tryFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = visibleContacts();

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  return (
    <div>
      <FirstTitle>Phonebook</FirstTitle>
      <Form onSubmit={addContact} />
      <SecondTitle>Contacts</SecondTitle>
      <Filter value={filter} onChange={tryFilter} />
      <ContactsList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
