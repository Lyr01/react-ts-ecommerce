import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import "../../src/style.css";
import { Product } from "../module";

interface Props {
	product: Product;
}

const ProductCard = ({ product }: Props) => {
	return (
		<>
			<Card className="card mt-5  text-center" style={{ height: "25rem" }}>
				<img
					style={{
						height: "10rem",
					}}
					src={product.image}
					className="mx-auto my-1 d-flex"
					alt="product"
				/>
				<CardBody>
					<CardTitle tag="h5">{product.title}</CardTitle>
					<CardSubtitle className="mb-2 text-muted" tag="h6">
						{product.category}
					</CardSubtitle>
					<CardText className="text-truncate">{product.description}</CardText>
					<h3>{product.price}$</h3>
				</CardBody>
			</Card>
		</>
	);
};

export default ProductCard;
