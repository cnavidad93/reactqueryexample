import { useState } from 'react';
import { useQuery } from 'react-query';
import MyAutoComplete from './Autocomplete';

// import './styles.scss';

interface Suggestion {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: any[];
  starships: any[];
  created: Date;
  edited: Date;
  url: string;
}

const MIN_SEARCH_LENGTH = 3;

function DebouncedList() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [allowSearch, setAllowSearch] = useState<boolean>(false);

  const suggestions = useQuery<Suggestion[]>(
    ['search', searchValue],
    () =>
      fetch(`https://swapi.dev/api/people?search=${searchValue}`)
        .then((resp) => resp.json())
        .then((resp) => resp.results as Suggestion[]),
    {
      refetchOnWindowFocus: false,
      enabled: searchValue.length >= MIN_SEARCH_LENGTH,
      staleTime: 5000,
    }
  );

  return (
    <div className="debounce-list">
      <h1>Debounced List</h1>
      <div className="search">
        Search
        <MyAutoComplete
          value={searchValue}
          options={suggestions.data ?? []}
          minLength={3}
          loading={suggestions.isLoading}
          placeholder="Search a character name.."
          emptyMessage="No character found"
          optionTemplate={(item) => <div className="suggestion">{item.name}</div>}
          onChange={(query, { valid }) => {
            setSearchValue(query);
            setAllowSearch(valid);
          }}
          onSelect={(item) => console.log(item)}
        />
      </div>
    </div>
  );
}

export default DebouncedList;
