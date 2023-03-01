import { useNavigate, useParams } from "react-router";
import { useCart } from "react-use-cart";
import NavBar from "../components/Home";
import { useSingleProductQuery } from "../hooks/useProductsQuery";
import style from "./SingleProduct.module.css";

import CartLogo from "../images/icon-cart.svg";

const SingleProduct = () => {
	const { addItem } = useCart();

	const navigateTo = useNavigate();

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
		<>
			<NavBar showAllProducts={false} />

			<div className={style.App}>
				<div className={style.card}>
					<div className={style.card_img}>
						<img
							src={data?.data.image}
							alt="prodoct"
							className={style.product_img}
						/>
					</div>
					<div className={style.card_content}>
						<small className={style.category}>{data?.data.category}</small>
						<h1 className={style.title}>{data?.data.title}</h1>
						<p className={style.description}>{data?.data.description}</p>
						<h1 className={style.price}>
							{data?.data.price.toString().includes(".")
								? data.data.price + "$"
								: data?.data.price + ".00$"}
						</h1>

						<button
							className={style.add_to_cart}
							onClick={() => {
								addItem(data?.data, 1);
								navigateTo("/cart");
							}}
						>
							<img src={CartLogo} alt="cart icon" className={style.cart_icon} />
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleProduct;
