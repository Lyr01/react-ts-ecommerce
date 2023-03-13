import React, { createContext, useState } from "react";

import AllProducts from "../routes/AllProducts";
import NavBar from "./NavBar";

interface FilterContextType {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	categoryValue: string;
	setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
}

export const filterContext = createContext<FilterContextType>({
	searchValue: "",
	setSearchValue: () => {},
	categoryValue: "default",
	setCategoryValue: () => {},
});

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
