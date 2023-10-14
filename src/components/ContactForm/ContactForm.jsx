import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from './ContactForm.styled';
import { addContact, getphoneBooksValue } from 'redux/contactSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const phoneBook = useSelector(getphoneBooksValue);

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'name') setName(value);
    else setNumber(value);
  };

  const onSubmitAddContact = event => {
    event.preventDefault();
    const data = { name, number };
    const newObj = { ...data, id: nanoid() };

    if (isNameNew(phoneBook, newObj) !== undefined) {
      toast.warning(`${newObj.name} is already in contacts`);
      return;
    }

    dispatch(addContact(newObj));

    reset();
  };

  const isNameNew = (phoneBook, newObj) => {
    return phoneBook.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={onSubmitAddContact}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          value={name}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          value={number}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
};
