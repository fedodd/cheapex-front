import {
  SET_LIMITS,
  SET_STORE_DATA,
  FETCH_TABLE_DATA,
  SET_ERROR_ON_LOAD,
} from "../actionTypes";

const initialState = {
  // allIds: [],
  // byIds: {},
  err: null,
  fetchedData: {},
  storeData: [],
  limits: {
    days: {
      min: 0,
      max: 0,
    },
    price: {
      min: 0,
      max: 0,
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LIMITS: {
      const limits = action.payload;

      return {
        ...state,
        ...limits,
      };
    }

    case FETCH_TABLE_DATA: {
      const fetchedData = action.payload;

      return {
        ...state,
        ...fetchedData,
      };
    }
    case SET_STORE_DATA: {
      // need to get storeData cause payload is object, but we send array
      const storeData = action.payload.storeData;
      return {
        ...state,
        storeData,
      };
    }
    case SET_ERROR_ON_LOAD: {
      const err = action.payload;

      return {
        ...state,
        ...err,
      };
    }
    // case TOGGLE_TODO: {
    //   const { id } = action.payload;
    //   return {
    //     ...state,
    //     byIds: {
    //       ...state.byIds,
    //       [id]: {
    //         ...state.byIds[id],
    //         completed: !state.byIds[id].completed,
    //       },
    //     },
    //   };
    // }
    default:
      return state;
  }
}
