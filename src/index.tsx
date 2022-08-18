import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./routes/SingleProduct";

import { CartProvider } from "react-use-cart";
import Cart from "./routes/Cart";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<CartProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/products/:productID" element={<SingleProduct />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</CartProvider>
	</React.StrictMode>
);
