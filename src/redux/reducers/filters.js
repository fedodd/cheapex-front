import {
  SET_FILTERED_ROWS,
  SET_END_POINTS,
  SET_FILTER_DAYS,
  SET_FILTER_PRICE,
} from "../actionTypes";
// import { VISIBILITY_FILTERS } from "../constants";

// const initialState = VISIBILITY_FILTERS.ALL;
const initialState = {
  filteredRows: [],

  days: {
    min: 0,
    max: 0,
  },
  price: {
    min: 0,
    max: 0,
  },
};

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERED_ROWS: {
      // console.log(action.payload);
      const filteredRows = action.payload;
      // console.log("in action", filteredRows);

      return {
        ...state,
        ...filteredRows,
      };
    }

    // case SET_END_POINTS: {
    //   console.log(action.payload);
    //   // if (has)
    //   const endPoints = action.payload;
    //   return {
    //     ...state,
    //     ...endPoints,
    //   };
    // }

    case SET_FILTER_DAYS: {
      // console.log("days", action.payload);
      // if (has)
      const days = action.payload;
      return {
        ...state,
        ...days,
      };
    }

    case SET_FILTER_PRICE: {
      // console.log("price", action.payload);
      // if (has)
      const price = action.payload;
      return {
        ...state,
        ...price,
      };
    }

    default: {
      return state;
    }
  }
};

export default visibilityFilter;
