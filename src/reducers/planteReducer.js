import planteService from "../services/planteService";

/* INITIAL STATE */

const initialState = {
  planteHit: {},
  plante: {},
  illustrations: [],
  collections: [],
  descriptors: [],
  isBookmarked: false,
  fetchingPlante: false,
  fetchPlanteFailed: false,
  fetchingImages: false,
  fetchingCollections: false,
  fetchingDescriptors: false,
  fetchingPlanteResources: false,
  fetchPlanteResourcesFailed: false
};

/* REDUCERS */

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PLANTE:
      return {
        ...initialState
      };
    case FETCHING_PLANTE:
      return {
        ...state,
        fetchingPlante: true,
        fetchPlanteFailed: false
      };

    case PLANTE_FETCHED:
      return {
        ...state,
        plante: action.plante,
        fetchingPlante: false
      };

    case PLANTE_FETCH_FAILED:
      return {
        ...state,
        fetchPlanteFailed: true
      };
    case FETCHING_PLANTE_RESOURCES:
      return {
        ...state,
        fetchingPlanteResources: true
      };

    case PLANTE_ILLUSTRATIONS_FETCHED:
      return {
        ...state,
        illustrations: action.illustrations,
        fetchingPlanteResources: false
      };

    case PLANTE_COLLECTIONS_FETCHED:
      return {
        ...state,
        collections: action.collections,
        fetchingPlanteResources: false
      };

    case PLANTE_DESCRIPTORS_FETCHED:
      return {
        ...state,
        descriptors: action.descriptors,
        fetchingPlanteResources: false
      };

    case PLANTE_RESOURCES_FETCH_FAILED:
      return {
        ...state,
        fetchPlanteResourcesFailed: true
      };

    default:
      return state;
  }
};

/* actionCreators */
export const clearPlante = () => dispatch => {
  console.log("Clear Plante");
  dispatch({
    type: "plante/CLEAR_PLANTE"
  });
};

export function getPlante(id, token) {
  return async (dispatch, getState) => {
    try {
      const plante = await planteService.getPlante(id, token);
      dispatch({ type: "plante/FETCHING_PLANTE" });
      dispatch({ type: "plante/PLANTE_FETCHED", plante });
      console.log("fetched plante", plante);
    } catch (error) {
      console.error(error);
      dispatch({ type: "plante/PLANTE_FETCH_FAILED" });
    }
  };
}

export function getPlanteResources(id, resourceName, token) {
  return async (dispatch, getState) => {
    try {
      const resources = await planteService.getPlanteResources(
        id,
        resourceName,
        token
      );
      switch (resourceName) {
        case "illustrations":
          dispatch({ type: "plante/FETCHING_PLANTE_RESOURCES" });
          dispatch({
            type: "plante/PLANTE_ILLUSTRATIONS_FETCHED",
            illustrations: resources.illustrations
          });
          console.log("fetched plante illustrations", resources);
          break;
        case "collections":
          dispatch({ type: "plante/FETCHING_PLANTE_RESOURCES" });
          dispatch({
            type: "plante/PLANTE_COLLECTIONS_FETCHED",
            collections: resources.collections
          });
          console.log("fetched plante collections", resources);
          break;
        case "descriptors":
          dispatch({ type: "plante/FETCHING_PLANTE_RESOURCES" });
          dispatch({
            type: "plante/PLANTE_DESCRIPTORS_FETCHED",
            descriptors: resources
          });
          console.log("fetched plante descriptors", resources);
          break;
        default:
          return;
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "plante/PLANTE_FETCH_FAILED" });
    }
  };
}

/* ACTIONS */
export const CLEAR_PLANTE = "plante/CLEAR_PLANTE";
export const FETCHING_PLANTE = "plante/FETCHING_PLANTE";
export const PLANTE_FETCHED = "plante/PLANTE_FETCHED";
export const PLANTE_FETCH_FAILED = "plante/PLANTE_FETCH_FAILED";
export const FETCHING_PLANTE_RESOURCES = "plante/FETCHING_PLANTE_RESOURCES";
export const PLANTE_ILLUSTRATIONS_FETCHED =
  "plante/PLANTE_ILLUSTRATIONS_FETCHED";
export const PLANTE_COLLECTIONS_FETCHED = "plante/PLANTE_COLLECTIONS_FETCHED";
export const PLANTE_DESCRIPTORS_FETCHED = "plante/PLANTE_DESCRIPTORS_FETCHED";
export const PLANTE_RESOURCES_FETCH_FAILED =
  "plante/PLANTE_RESOURCES_FETCH_FAILED";
