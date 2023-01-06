interface ICountry {
  id: number,
  name: string,
}

interface IState {
  id: number,
  name: string,
}

interface ICity {
  id: number,
  name: string,
}

interface ICoordinates {
  decimal: number,
  dms: string,
}

export interface IAirport {
    id: number,
    icao: string,
    iata: string,
    faa: string |null,
    name: string,
    fullName: string,
    country: ICountry,
    state: IState,
    city: ICity,
    fir: string,
    uir: string,
    magneticVariation: string,
    airportElevation: number,
    airportOfEntry: boolean,
    latitude: ICoordinates,
    longitude: ICoordinates,
    distanceFromBaseAirport: number,
    priority: number
}

export interface ISearchAirport {
  label: string,
  onSelectAirport: (airportId: number) => void;
}
