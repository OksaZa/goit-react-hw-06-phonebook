import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { delContact, selectContacts } from 'redux/contactSlice';
import { selectFilter } from 'redux/filterSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilter);
  const filterPhoneBook = useSelector(selectContacts);

  const visibleContacts = event => {
    const filteredContacts = filterPhoneBook.filter(contact =>
      contact.name.toLowerCase().includes(filtered.toLowerCase())
    );
    return filteredContacts;
  };

  return (
    <List>
      {visibleContacts().map(cont => {
        return (
          <li key={cont.id}>
            <span>{cont.name}</span>
            <span>{cont.number}</span>
            <button
              type="button"
              onClick={() => {
                dispatch(delContact(cont.id));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </List>
  );
};
