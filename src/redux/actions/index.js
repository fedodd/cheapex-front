import {
  SET_LIMITS,
  // SET_END_POINTS,
  SET_STORE_DATA,
  SET_FILTERED_ROWS,
  FETCH_TABLE_DATA,
  SET_ERROR_ON_LOAD,
  SET_FILTER_DAYS,
  SET_FILTER_PRICE,
} from "./../actionTypes";

export const setLimits = (limits) => ({
  type: SET_LIMITS,
  payload: { limits },
});

export const setStoreData = (storeData) => ({
  type: SET_STORE_DATA,
  payload: { storeData },
});

export const fetchTableData = (tableData) => ({
  type: FETCH_TABLE_DATA,
  payload: { tableData },
});

export const setErrorOnLoad = (err) => ({
  type: SET_ERROR_ON_LOAD,
  payload: { err },
});

export const setFilteredRows = (filteredRows) => ({
  type: SET_FILTERED_ROWS,
  payload: { filteredRows },
});

// export const setEndPoints = (endPoints) => ({
//   type: SET_END_POINTS,
//   payload: { {days} },
// });

export const setFilterDays = (days) => ({
  type: SET_FILTER_DAYS,
  payload: { days },
});

export const setFilterPrice = (price) => ({
  type: SET_FILTER_PRICE,
  payload: { price },
});

// let nextTodoId = 0;

// export const addTodo = (content) => ({
//   type: ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content,
//   },
// });

// export const toggleTodo = (id) => ({
//   type: TOGGLE_TODO,
//   payload: { id },
// });
