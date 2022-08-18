import React, { useEffect } from "react";

import NavBar from "./components/NavBar";
import "./style.css";

function App() {
	useEffect(() => {
		document.body.style.backgroundColor = "#adb5bd";
	}, []);
	return (
		<div>
			<NavBar />
		</div>
	);
}

export default App;
