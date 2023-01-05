import React, {useState} from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  Container,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface IAutoCompleteInput {
  value: string
  onSubmit: (text: string) => void
}

const AutoCompleteInput = (props: IAutoCompleteInput) => {
  const [searchString, setSearchString] = useState('');
  const {onSubmit, value} = props;

  const InputField = (params: AutocompleteRenderInputParams) => (
    <Container>
      <Grid container>
        <Grid item sm={11}>
        <TextField
          {...params}
          label="Search here ..."
          value={value}
          onChange={event => setSearchString(event.target.value)}
        />
        </Grid>
        <Grid item sm={1}>
        <IconButton onClick={() => onSubmit(searchString)}><SearchIcon /></IconButton>
        </Grid>
      </Grid>
    </Container>

  )
  return (
    <Autocomplete
      id="combo-box-demo"
      inputValue={searchString}
      options={['Option 1', 'Option 2']}
      sx={{ width: window.screen.width * 0.9 }}
      renderInput={InputField}
      onChange={(_, value) => setSearchString(value as string)}
    />
  );
}

export default AutoCompleteInput;
