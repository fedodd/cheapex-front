import { VISIBILITY_FILTERS } from "../constants";

export const getTableState = (store) => store.table;

export const getTodoList = (store) =>
  getTableState(store) ? getTableState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTableState(store) ? { ...getTableState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTable = (store) =>
  getTodoList(store).map((id) => getTodoById(store, id));

export const getTableByVisibilityFilter = (store, visibilityFilter) => {
  const allTable = getTable(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTable.filter((todo) => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTable.filter((todo) => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTable;
  }
};
