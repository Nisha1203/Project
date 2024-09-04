import React from "react";
import { useGlobalContext } from "./context";

const Pagination = () => {
  const { page, noPages, getNextPage, getPrevPage } = useGlobalContext();

  return (
    <>
      <div className="pagination_btn">
        <button onClick={() => getPrevPage()}>PREV</button>
        <p>
          {page + 1} of {noPages}
        </p>
        <button onClick={() => getNextPage()}>NEXT</button>
      </div>
    </>
  );
};

export default Pagination;
