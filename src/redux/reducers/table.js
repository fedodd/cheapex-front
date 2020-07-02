import { SET_END_POINTS } from "../actionTypes";

const initialState = {
  // allIds: [],
  // byIds: {},
  endPoints: {
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
    case SET_END_POINTS: {
      const endPoints = action.payload;

      return {
        ...state,
        ...endPoints,
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
