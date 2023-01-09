import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import {Airports} from "./Airports";
import {Trips} from "./Trips";

const RootModel = types.model({
  Airports,
  Trips,
});


export const rootStore = RootModel.create({
  Airports: {
    airports: [],
    loading: false,
  },
  Trips: {
    trips: [],
    loading: false,
  },
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
