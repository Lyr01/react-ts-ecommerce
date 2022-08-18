import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/ProductCard";

import { useProductsQuery } from "../hooks/useProductsQuery";
import { Product } from "../module";

interface Props {
	searchValue: string;
	categoryValue: string;
}

const AllProducts = ({ searchValue, categoryValue }: Props) => {
	const { isLoading, error, data } = useProductsQuery();
	const defaultValue = categoryValue ? categoryValue : "default";

	categoryValue = defaultValue;

	const ascendingPrice: Product[] = data?.data.sort(
		(a: Product, b: Product) => {
			return a.price - b.price;
		}
	);

	const byCategory = data?.data.map((product: Product) => {
		if (product.title.toLowerCase().includes(searchValue))
			if (
				categoryValue === "default" ||
				categoryValue.toLowerCase() === product.category
			)
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
		<>
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
		</>
	);
};

export default AllProducts;
