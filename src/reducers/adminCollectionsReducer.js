import adminCollectionService from "../services/adminCollectionsService";

/* INITIAL STATE */

const initialState = {
  activeCollection: {
    collection: {},
    error: null,
    loading: false
  },
  //WIP
  newCollection: {},
  //WIP
  updatedCollection: {},
  allCollections: {
    collections: [],
    collectionsByIds: [],
    error: null,
    loading: false
  }
};

/* REDUCERS */

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return {
        ...initialState
      };

    // Read
    case FETCH_COLLECTION:
      return {
        ...state,
        activeCollection: {
          collection: {},
          error: null,
          loading: true
        }
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        activeCollection: {
          collection: action.payload.collection,
          error: null,
          loading: false
        }
      };
    case FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        activeCollection: {
          collection: {},
          error: action.error,
          loading: false
        }
      };
    case RESET_COLLECTION:
      return {
        ...state,
        activeCollection: {
          collection: {},
          error: null,
          loading: false
        }
      };

    // Create... WIP
    case CREATE_COLLECTION:
      return {
        ...state
      };
    case CREATE_COLLECTION_SUCCESS:
      return {
        ...state
      };
    case CREATE_COLLECTION_FAILURE:
      return {
        ...state
      };

    // Update... WIP
    case UPDATE_COLLECTION:
      return {
        ...state
      };
    case UPDATE_COLLECTION_SUCCESS:
      return {
        ...state
      };
    case UPDATE_COLLECTION_FAILURE:
      return {
        ...state,
        collection: action.collection
      };

    // Collections Index
    case FETCH_COLLECTIONS:
      return {
        ...state,
        allCollections: {
          collections: [],
          collectionsByIds: [],
          error: null,
          loading: true
        }
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        allCollections: {
          collections: action.collections.collections,
          meta: action.collections.meta,
          collectionsByIds: [],
          error: null,
          loading: false
        }
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        allCollections: {
          collections: [],
          collectionsByIds: [],
          error: action.error,
          loading: false
        }
      };
    case RESET_COLLECTIONS:
      return {
        ...state,
        allCollections: {
          collections: [],
          collectionsByIds: [],
          error: null,
          loading: false
        }
      };

    default:
      return state;
  }
};

/* actionCreators */
export const clearState = () => dispatch => {
  console.log("Rest Admin Collections State");
  dispatch({
    type: "adminCollections/RESET_STATE"
  });
};

export function getCollection(id, token) {
  return async (dispatch, getState) => {
    try {
      const payload = await adminCollectionService.getCollection(id, token);
      dispatch({ type: "adminCollections/FETCH_COLLECTION" });
      dispatch({
        type: "adminCollections/FETCH_COLLECTION_SUCCESS",
        payload
      });
      console.log("collection fetched", payload);
    } catch (error) {
      console.error(error);
      dispatch({ type: "adminCollections/FETCH_COLLECTION_FAILURE", error });
    }
  };
}

export function getCollections(id, token) {
  return async (dispatch, getState) => {
    try {
      const collections = await adminCollectionService.getCollections(
        id,
        token
      );
      dispatch({ type: "adminCollections/FETCH_COLLECTIONS" });
      dispatch({
        type: "adminCollections/FETCH_COLLECTIONS_SUCCESS",
        collections
      });
      console.log("collection fetched", collections);
    } catch (error) {
      console.error(error);
      dispatch({ type: "adminCollections/FETCH_COLLECTIONS_FAILURE", error });
    }
  };
}

/* ACTIONS */
export const RESET_STATE = "adminCollections/RESET_STATE";
export const FETCH_COLLECTION = "adminCollections/FETCH_COLLECTION";
export const FETCH_COLLECTION_SUCCESS =
  "adminCollections/FETCH_COLLECTION_SUCCESS";
export const FETCH_COLLECTION_FAILURE =
  "adminCollections/FETCH_COLLECTION_FAILURE";
export const RESET_COLLECTION = "adminCollections/RESET_COLLECTION";
export const CREATE_COLLECTION = "adminCollections/CREATE_COLLECTION";
export const CREATE_COLLECTION_SUCCESS =
  "adminCollections/CREATE_COLLECTION_SUCCESS";
export const CREATE_COLLECTION_FAILURE =
  "adminCollections/CREATE_COLLECTION_FAILURE";
export const UPDATE_COLLECTION = "adminCollections/UPDATE_COLLECTION";
export const UPDATE_COLLECTION_SUCCESS =
  "adminCollections/UPDATE_COLLECTION_SUCCESS";
export const UPDATE_COLLECTION_FAILURE =
  "adminCollections/UPDATE_COLLECTION_FAILURE";
export const FETCH_COLLECTIONS = "adminCollections/FETCH_COLLECTIONS";
export const FETCH_COLLECTIONS_SUCCESS =
  "adminCollections/FETCH_COLLECTIONS_SUCCESS";
export const FETCH_COLLECTIONS_FAILURE =
  "adminCollections/FETCH_COLLECTIONS_FAILURE";
export const RESET_COLLECTIONS = "adminCollections/RESET_COLLECTIONS";
