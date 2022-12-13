import * as actions from "../constants/appConstant.js";
// import { getSearchResultService } from "services/ProductService";
// export const getSearchResult = (inputSearch, page, size) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: actions.FETCH_SEARCH_START });
//       const res = await getSearchResultService(inputSearch, page, size);
//       if (res && res.errCode === 0) {
//         dispatch({ type: actions.FETCH_SEARCH_SUCCESS, payload: res });
//       } else {
//         dispatch({ type: actions.FETCH_SEARCH_FAILLED });
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: actions.FETCH_SEARCH_FAILLED });
//     }
//   };
// };

export const fecthDataStart = { type: actions.FETCH_DATA_START };
export const fecthDataEnd = { type: actions.FETCH_DATA_END };
export const fecthNotify = { type: actions.FETCH_NOTIFY };
