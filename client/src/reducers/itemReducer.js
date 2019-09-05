import uuid from "uuid";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "Milk" },
    { id: uuid(), name: "Steak" },
    { id: uuid(), name: "Watere" }
  ]
};

export default function(state = initialState, action) {
  console.log("action", action.type);
  console.log({ ...state });
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };

    default:
      return state;
  }
}
