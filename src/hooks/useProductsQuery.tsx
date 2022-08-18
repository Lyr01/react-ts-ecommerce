import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductsQuery = () =>
	useQuery(
		["product-data"],
		() => {
			return axios.get("https://fakestoreapi.com/products");
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);

export const useSingleProductQuery = (productID: string) =>
	useQuery(
		["product-data", productID],
		() => {
			return axios.get(`https://fakestoreapi.com/products/${productID}`);
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);
