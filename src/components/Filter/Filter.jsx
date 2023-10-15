import { FilterContainer } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterSet, selectFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const filterPhoneBook = useSelector(state => selectFilter(state));
  const onChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(filterSet(value));
  };

  return (
    <FilterContainer>
      <label>
        Find contacts by name:
        <input
          name="filter"
          type="text"
          value={filterPhoneBook}
          onChange={onChangeFilter}
        />
      </label>
    </FilterContainer>
  );
};
