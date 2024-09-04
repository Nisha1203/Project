import { useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";
import React from "react";

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "news",
  noPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url); ///to fetch the data from url
      const data = await res.json(); //to convert data into json
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          noPages: data.nbPages, //these nbpages vagera is taken from the api itself
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //STORIED CONTEXT REDUCER STORIES
  //to remove the post
  const removePost = (post_id) => {
    dispatch({ type: "Remove_POST", payload: post_id });
  };

  //to call the api func
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  //pagination
  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook creation
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
