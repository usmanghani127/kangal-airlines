import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import {ISearchAirport} from "./interfaces";
import {useMst} from "../Models/Root";
import { observer } from "mobx-react-lite";

const SearchAirport = forwardRef((props: ISearchAirport, ref) => {
  const [searchString, setSearchString] = useState('');
  const {label, onSelectAirport} = props;

  let timer = useRef<any>(undefined)
  let autocompleteRef = useRef<any>(undefined)

  const {Airports} = useMst();

  useImperativeHandle(ref, () => ({
    clear: () => autocompleteRef.current.inputValue = '',
  }))

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      searchString.length < 3 ? !!Airports.airports.length && Airports.clear() : Airports.getAirports(searchString)
    }, 200);
  }, [Airports, searchString])

  const InputField = (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label}
        onChange={event => setSearchString(event.target.value)}
      />

  )
  return (
    <Autocomplete
      ref={autocompleteRef}
      id="combo-box-demo"
      // inputValue={searchString}
      options={Airports.airports}
      renderInput={InputField}
      getOptionLabel={option => option.fullName}
      // @ts-ignore
      onChange={(_, value) => onSelectAirport(value.id)}
    />

  );
});

export default observer(SearchAirport);
