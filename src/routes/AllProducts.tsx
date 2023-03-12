import { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { filterContext } from "../components/Home";
import ProductCard from "../components/ProductCard";

import { useProductsQuery } from "../hooks/useProductsQuery";
import { Product } from "../module";
const lodash = require("lodash");

const AllProducts = () => {
	const { searchValue, categoryValue } = useContext(filterContext);

	const { isLoading, error, data } = useProductsQuery();
	const data1 = lodash.shuffle(data?.data);

	const ascendingPrice: Product[] = data?.data.sort(
		(a: Product, b: Product) => {
			return a.price - b.price;
		}
	);

	const byCategory = data1.map((product: Product) => {
		if (product.title.toLowerCase().includes(searchValue))
			if (
				categoryValue === "default" ||
				categoryValue.toLowerCase() === product.category
			)
				return (
					<Col key={product.id} className="d-flex justify-content-center">
						<Link
							to={`/products/${product.id}`}
							key={product.id}
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							<ProductCard product={product} />
						</Link>
					</Col>
				);
		return null;
	});

	const byAscendingPrice = ascendingPrice?.map((product: Product) => {
		if (product.title.toLowerCase().includes(searchValue))
			return (
				<Col key={product.id}>
					<Link
						to={`/products/${product.id}`}
						key={product.id}
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<ProductCard product={product} />
					</Link>
				</Col>
			);
		return null;
	});

	const byDescendingPrice = ascendingPrice
		?.reverse()
		.map((product: Product) => {
			if (product.title.toLowerCase().includes(searchValue))
				return (
					<Col key={product.id}>
						<Link
							to={`/products/${product.id}`}
							key={product.id}
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							<ProductCard product={product} />
						</Link>
					</Col>
				);
			return null;
		});

	if (isLoading)
		return (
			<>
				<h2>Loading...</h2>
			</>
		);

	if (error instanceof Error)
		return <>"An error has occurred: " + {error.message};</>;

	return (
		<Container fluid>
			<Row>
				{(() => {
					if (categoryValue === "ascending") {
						return byAscendingPrice;
					} else if (categoryValue === "descending") {
						return byDescendingPrice;
					} else {
						return byCategory;
					}
				})()}
			</Row>
		</Container>
	);
};

export default AllProducts;
