
import {
  types,
  flow,
  detach,
} from "mobx-state-tree";
import {PAGE_SIZE, SEARCH_TRIP_URL} from "../Constants";

const TripCategory = types.model({
  id: types.number,
  name: types.string,
})
export const Trip = types.model('Trip', {
  arrivalAirport: types.maybeNull(types.number),
  budget: types.maybeNull(types.number),
  company: types.maybeNull(types.string),
  companyId: types.maybeNull(types.number),
  createdByUser: types.maybeNull(types.number),
  currency: types.maybeNull(types.number),
  departureAirport: types.maybeNull(types.number),
  fromDate: types.maybeNull(types.string),
  hasQuotationRequest: types.boolean,
  hasQuoted: types.boolean,
  hasReplies: types.boolean,
  id: types.number,
  integrationSource: types.maybeNull(types.number),
  integrationSourceId: types.number,
  noOfPassenger: types.maybeNull(types.number),
  postedDate: types.string,
  title: types.string,
  toDate: types.maybeNull(types.string),
  tripCategory: TripCategory,
  tripCategoryId: types.number,
  tripQuotes: types.array(types.string), tripReplies: types.array(types.string),
  tripType: types.number,
})

export const Trips = types
  .model('Searched Trips', {
    trips: types.array(Trip),
    loading: types.boolean,
  })
  .actions(self => ({
    getTrips: flow(function*(params: any) {
      try {
        self.loading = true;
        const results = yield fetch(SEARCH_TRIP_URL + new URLSearchParams({...params}) );
        const json: any = yield results.json();
        const trips = json?.result?.trips || []
        if (trips.length === 0) {
          alert("No trips found.")
        }
        detach(self.trips);
        self.trips = trips;
        self.loading = false;
      } catch (e: any) {
        detach(self.trips);
        // @ts-ignore
        self.trips =  [];
        self.loading = false;
        console.log({error: e.message})
        alert(e.message)
      }
     }),

  }));
