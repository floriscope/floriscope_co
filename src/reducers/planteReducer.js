import planteService from "../services/planteService";

/* INITIAL STATE */

const initialState = {
  planteHit: {},
  plante: {},
  pictures: [],
  collections: [],
  descriptors: [],
  isBookmarked: false,
  fetchingPlante: false,
  fetchPlanteFailed: false,
  fetchingImages: false,
  fetchingCollections: false,
  fetchingDescriptors: false
};

/* REDUCERS */

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PLANTE:
      return {
        ...state,
        fetchingPlante: true,
        fetchPlanteFailed: false,
        pictures: [],
        collections: [],
        descriptors: []
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

    default:
      return state;
  }
};

/* actionCreators */
export function getPlante(id, token) {
  return async (dispatch, getState) => {
    try {
      const plante = await planteService.getPlante(id, token);
      dispatch({ type: "plante/FETCHING_PLANTE" });
      dispatch({ type: "plante/LOGIN_IN", plante });
      console.log("fetched plante", plante);
    } catch (error) {
      console.error(error);
      dispatch({ type: "plante/PLANTE_FETCH_FAILED" });
    }
  };
}

/* ACTIONS */
export const FETCHING_PLANTE = "plante/FETCHING_PLANTE";
export const PLANTE_FETCHED = "plante/PLANTE_FETCHED";
export const PLANTE_FETCH_FAILED = "plante/PLANTE_FETCH_FAILED";
