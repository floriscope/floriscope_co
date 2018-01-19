const initialState = {
  searchState: {},
  indexName: "vegebaseIllustrations_ADMIN"
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
        indexName: "vegebaseIllustrations_ADMIN"
      };
    default:
      return state;
  }
};

// actionCreators

export const changeSearchState = searchState => dispatch => {
  dispatch({
    type: "adminImages/CHANGE_SEARCH_STATE",
    searchState: searchState
  });
};

export const clearSearchState = () => dispatch => {
  dispatch({
    type: "adminImages/CLEAR_SEARCH_STATE"
  });
};
// Actions
export const CHANGE_SEARCH_STATE = "adminImages/CHANGE_SEARCH_STATE";
export const CLEAR_SEARCH_STATE = "adminImages/CLEAR_SEARCH_STATE";
