import React, {useState, useEffect, useRef} from 'react';
import SearchAirport from "../../Components/SearchAirport";

const SearchFlights = () => {
  const [departureAirportId, setDepartureAirportId] = useState<number | null>(null);
  const [arrivalAirportId, setArrivalAirportId] = useState<number | null>(null);

  let departureAirportRef = useRef<any>(undefined)
  let arrivalAirportRef = useRef<any>(undefined)

  useEffect(() => {
    if (departureAirportId && arrivalAirportId && departureAirportId === arrivalAirportId) {
      alert('Departure and Arrival Airports cannot be the same');
      // setDepartureAirportId(null);
      // setArrivalAirportId(null);
      // departureAirportRef.current.clear();
      // arrivalAirportRef.current.clear();
    }
  }, [departureAirportId, arrivalAirportId])

  return (
    <div className="searchScreen">
        <h1>Kangal Airlines</h1>
        <SearchAirport ref={departureAirportRef} label={'Departure'} onSelectAirport={setDepartureAirportId} />
        <SearchAirport ref={arrivalAirportRef}  label={'Arrival'} onSelectAirport={setArrivalAirportId} />
    </div>
  );
}

export default SearchFlights;
