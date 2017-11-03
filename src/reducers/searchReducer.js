const initialState = {
  searchState: {},
  indexName: ""
};

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_STATE:
      return {
        ...state,
        searchState: action.searchState,
        indexName: action.indexName
      };

    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchState: {},
        indexName: ""
      };
    default:
      return state;
  }
};

// actionCreators

export const changeSearchState = searchState => dispatch => {
  dispatch({ type: "search/CHANGE_SEARCH_STATE", searchState });
  console.log("search/CHANGE_SEARCH_STATE", searchState);
};

export const clearSearchState = () => dispatch => {
  dispatch({
    type: "search/CLEAR_SEARCH_STATE"
  });
};
// Actions
export const CHANGE_SEARCH_STATE = "auth/CHANGE_SEARCH_STATE";
export const CLEAR_SEARCH_STATE = "auth/CLEAR_SEARCH_STATE";
