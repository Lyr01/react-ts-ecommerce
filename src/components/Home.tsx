import React, { createContext, useState } from "react";

import AllProducts from "../routes/AllProducts";
import NavBar from "./NavBar";

export const filterContext = createContext<any>("");

const Home = () => {
	const [searchValue, setSearchValue] = useState("");
	const [categoryValue, setCategoryValue] = useState("default");

	return (
		<filterContext.Provider
			value={{ searchValue, setSearchValue, categoryValue, setCategoryValue }}
		>
			<NavBar />

			<AllProducts />
		</filterContext.Provider>
	);
};

export default Home;
