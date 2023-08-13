import React from "react";
import SearchBar from "../component/search/searchBar";
import BottomBar from "../component/global/bottomBar";
import Stalklogo from "../component/search/StalkLogo";
const SearchPage = () => {
  return (
    <>
      <SearchBar></SearchBar>
      <Stalklogo></Stalklogo>
      <BottomBar></BottomBar>
    </>
  );
};

export default SearchPage;
