import React, {useState, useEffect, useRef} from 'react';
import SearchAirport from "../../Components/SearchAirport";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {useMst} from "../../Models/Root";
import {observer} from "mobx-react-lite";

const SearchFlights = () => {
  const [departureAirportId, setDepartureAirportId] = useState<number | null>(null);
  const [arrivalAirportId, setArrivalAirportId] = useState<number | null>(null);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  let departureAirportRef = useRef<any>(undefined)
  let arrivalAirportRef = useRef<any>(undefined)

  const {Trips} = useMst();

  useEffect(() => {
    dayjs.extend(AdvancedFormat);
  }, [])

  useEffect(() => {
    if (departureAirportId && arrivalAirportId && departureAirportId === arrivalAirportId) {
      alert('Departure and Arrival Airports cannot be the same');
      // setDepartureAirportId(null);
      // setArrivalAirportId(null);
      // departureAirportRef.current.clear();
      // arrivalAirportRef.current.clear();
    }
  }, [departureAirportId, arrivalAirportId])

  const onClickSearch = () => {
    if (departureAirportId && arrivalAirportId && date) {
      Trips.getTrips({
        departureAirportId,
        // arrivalAirport: arrivalAirportId, // Filter not working
        // etd: date?.format('YYYY-MM-DD'), // Filter not working
        // pageNumber: 1, // Filter not working
      })
    }
  }

  const renderTrip = (trip: any) => (
      <Card key={trip.id} sx={{ width: window.screen.width * 0.8 }}>
        <Grid container>
        <Grid item xs={3}>
          <CardMedia
            sx={{ height: window.screen.height * 0.2 }}
            image={"https://www.kickassfacts.com/wp-content/uploads/2016/10/Air-Travel.jpg"}
            title={trip.id}
          />
        </Grid>
        <Grid item xs={9}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {trip.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dayjs(trip.postedDate).format('Do MMM, YYYY')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trip.tripCategory.name}
            </Typography>
          </CardContent>
        </Grid>
    </Grid>
      </Card>

  )
  return (
    <Container>
        <h1>Kangal Airlines</h1>
        <Grid container>
          <Grid item xs={4}>
            <SearchAirport ref={departureAirportRef} label={'Departure'} onSelectAirport={setDepartureAirportId} />
          </Grid>
          <Grid item xs={4}>
            <SearchAirport ref={arrivalAirportRef}  label={'Arrival'} onSelectAirport={setArrivalAirportId} />
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label={'Departure Date'}
                inputFormat="MM/DD/YYYY"
                minDate={dayjs()}
                value={date}
                onChange={(newValue: Dayjs | null) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
         </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={onClickSearch} disabled={Trips.loading} size={'large'}>
              Search
            </Button>
          </Grid>
          {}
          {Trips.loading ? <CircularProgress color={'info'} /> : Trips.trips.map(renderTrip) }
      </Grid>
    </Container>
  );
}

export default observer(SearchFlights);
