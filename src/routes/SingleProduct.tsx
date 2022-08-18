import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
	CardBody,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
	Row,
} from "reactstrap";
import NavBar from "../components/NavBar";
import { useSingleProductQuery } from "../hooks/useProductsQuery";

const SingleProduct = () => {
	useEffect(() => {
		document.body.style.backgroundColor = "#adb5bd";
	}, []);

	let param = useParams();

	const { isLoading, error, data } = useSingleProductQuery(param.productID!);

	if (isLoading)
		return (
			<>
				<h2>Loading...</h2>
			</>
		);

	if (error instanceof Error)
		return <>"An error has occurred: " + {error.message};</>;

	return (
		<div>
			<NavBar showAllProducts={false} />
			<Row>
				<Col>
					<img
						style={{ width: "10rem" }}
						src={data?.data.image}
						className="mx-4 my-1"
						alt="product"
					/>
				</Col>
				<Col className="border">
					<CardBody>
						<CardTitle tag="h1">{data?.data.title}</CardTitle>
						<hr></hr>
						<h2>{data?.data.price}.00$</h2>
						<CardSubtitle className="mb-2 text-muted" tag="h6">
							{data?.data.category}
						</CardSubtitle>
						<CardText>{data?.data.description}</CardText>
					</CardBody>
				</Col>
			</Row>
		</div>
	);
};

export default SingleProduct;
