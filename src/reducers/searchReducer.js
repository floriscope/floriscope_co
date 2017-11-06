const initialState = {
  searchState: {},
  indexName: "vegebasePlantes"
};

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_STATE:
      return {
        ...state,
        searchState: action.searchState
      };

    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchState: {},
        indexName: "vegebasePlantes"
      };
    default:
      return state;
  }
};

// actionCreators

export const changeSearchState = searchState => dispatch => {
  dispatch({
    type: "search/CHANGE_SEARCH_STATE",
    searchState: searchState
  });
};

export const clearSearchState = () => dispatch => {
  dispatch({
    type: "search/CLEAR_SEARCH_STATE"
  });
};
// Actions
export const CHANGE_SEARCH_STATE = "search/CHANGE_SEARCH_STATE";
export const CLEAR_SEARCH_STATE = "search/CLEAR_SEARCH_STATE";
