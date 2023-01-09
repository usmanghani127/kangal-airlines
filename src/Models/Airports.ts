
import {
  types,
  flow,
  detach
} from "mobx-state-tree";
import {SEARCH_AIRPORT_URL} from "../Constants";

const Country = types.model({
  id: types.number,
  name: types.string,
})

const State = types.model({
  id: types.number,
  name: types.string,
})

const City = types.model({
  id: types.number,
  name: types.string,
})

const Coordinates = types.model({
  decimal: types.number,
  dms: types.string,
})
export const Airport = types.model('Airport', {
  id: types.number,
  icao: types.maybeNull(types.string),
  iata: types.maybeNull(types.string),
  faa: types.maybeNull(types.string),
  name: types.string,
  fullName: types.string,
  country: types.maybeNull(Country),
  state: types.maybeNull(State),
  city: types.maybeNull(City),
  fir: types.maybeNull(types.string),
  uir: types.maybeNull(types.string),
  magneticVariation: types.maybeNull(types.string),
  airportElevation: types.maybeNull(types.number),
  airportOfEntry: types.maybeNull(types.boolean),
  latitude: types.maybeNull(Coordinates),
  longitude: types.maybeNull(Coordinates),
  distanceFromBaseAirport: types.maybeNull(types.number),
  priority: types.maybeNull(types.number),
})

export const Airports = types
  .model('Searched Airports', {
    airports: types.array(Airport),
    loading: types.boolean,
  })
  .actions(self => ({
    getAirports: flow(function*(searchString: string) {
      try {
        self.loading = true;
        const results = yield fetch(SEARCH_AIRPORT_URL.replace(':searchString', searchString));
        const json: any = yield results.json();
        detach(self.airports);
        self.airports = json?.result || [];
        self.loading = false;
      } catch (e: any) {
        console.log({error: e.message})
        alert(e.message)
      }
     }),
    clear: () => {
      detach(self.airports);
      // @ts-ignore
      self.airports = [];
    }

  }));
