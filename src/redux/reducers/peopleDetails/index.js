import {
  LOAD_PEOPLE_DETAILS,
  LOAD_PEOPLE_DETAILS_SUCCESS,
  LOAD_PEOPLE_DETAILS_FAILURE,
} from "./actions";

const initialDetailsState = {
  data: null,
  error: false,
  loading: false,
};

const peopleDetailsReducer = (state = initialDetailsState, action) => {
  switch (action.type) {
    case LOAD_PEOPLE_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PEOPLE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
      };
    case LOAD_PEOPLE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default peopleDetailsReducer;
