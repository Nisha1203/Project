const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORIES":
      return {
        ...state, // Return previous state
        isLoading: false,
        hits: action.payload.hits,
        noPages: action.payload.noPages,
      };
    case "Remove_POST":
      return {
        ...state,
        hits: state.hits.filter(
          (cur_ele) => cur_ele.objectID !== action.payload
        ),
      };
    case "SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "NEXT_PAGE":
      let pageNumm = state.page + 1;

      if (pageNumm >= state.noPages) {
        pageNumm = 0;
      }

      return {
        ...state,
        page: pageNumm,
      };
    case "PREV_PAGE":
      let pageNum = state.page - 1;

      if (pageNum <= 0) {
        pageNum = 0;
      }
      return {
        ...state,
        page: pageNum,
      };
    default:
      return state;
  }
};

export default reducer;
