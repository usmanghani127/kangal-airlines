import React, {useState} from 'react';
import AutoCompleteInput from "../../Components/AutoCompleteInput";
import SearchResults from "../../Components/SearchResults";

const Search = () => {
  const [selected, setSelected] = useState('');

  const search = (text: string) => {
    console.log({text})
  }
  return (
    <div className="searchScreen">
        <h1>Kangal Airlines</h1>
        <AutoCompleteInput value={selected} onSubmit={search} />
        <SearchResults />
    </div>
  );
}

export default Search;
