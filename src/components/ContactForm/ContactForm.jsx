import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from './ContactForm.styled';
import { addContact, selectContacts } from 'redux/contactSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'name') setName(value);
    else setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  const phoneBook = useSelector(selectContacts);
  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        if (
          phoneBook.some(
            value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
          )
        ) {
          alert(`${name} is alredy in contacts`);
        } else {
          dispatch(addContact({ name, number, id: nanoid() }));
        }
        reset();
      }}
    >
      <label>
        Name
        <input
          type="text"
          name="name"
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
