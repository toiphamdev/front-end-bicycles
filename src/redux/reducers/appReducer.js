import * as actions from "../constants/appConstant";
const initState = {
  isLoading: false,
  fetchNotify: false,
};
export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.FETCH_SEARCH_START: {
      return { ...state };
    }
    case actions.FETCH_SEARCH_SUCCESS: {
      let coppyState = { ...state };

      coppyState.currentStateSearchResult = action.payload.data;
      return { ...coppyState };
    }
    case actions.FETCH_SEARCH_FAILLED: {
      let coppyState = { ...state };
      coppyState.currentStateSearchResult = [];
      return { ...coppyState };
    }
    case actions.FETCH_DATA_START: {
      let coppyState = { ...state };

      coppyState.isLoading = true;
      return { ...coppyState };
    }
    case actions.FETCH_DATA_END: {
      let coppyState = { ...state };
      coppyState.isLoading = false;
      return { ...coppyState };
    }
    case actions.FETCH_NOTIFY: {
      let coppyState = { ...state };
      coppyState.fetchNotify = !state.fetchNotify;
      return { ...coppyState };
    }
    default:
      return state;
  }
};
