import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { delContact, getphoneBooksValue } from 'redux/contactSlice';
import { getFilter } from 'redux/filterSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  const phoneBook = useSelector(getphoneBooksValue);

  const filterPhoneBook = useSelector(getFilter);

  const visibleContacts = phoneBook.filter(({ name }) =>
    name.toLowerCase().includes(filterPhoneBook)
  );

  const deleteContact = contactId => {
    dispatch(delContact(contactId));
  };
  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <span>{name}</span>
            <span>{number}</span>
            <button type="button" onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </List>
  );
};
