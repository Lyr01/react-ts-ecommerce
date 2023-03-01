import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import NavBar from "../components/Home";
const lodash = require("lodash");

const Cart = () => {
	let price: Number[] = [0];

	const navigateTo = useNavigate();

	const {
		isEmpty,
		totalItems,
		items,
		updateItemQuantity,
		removeItem,
		emptyCart,
	} = useCart();

	if (isEmpty)
		return (
			<>
				<NavBar showAllProducts={false} />
				<h1 className="text-center mt-5 text-danger">Your cart is empty</h1>
			</>
		);

	return (
		<div className="text-center">
			<NavBar showAllProducts={false} />
			<br />
			<h1>Cart ({totalItems})</h1>
			<br />
			<br />
			<div className="d-flex gap-5 flex-wrap justify-content-center">
				{items.map((item) => (
					<div className="card" key={item.id}>
						<div className="mt-5">
							<img
								src={item.image}
								alt="product"
								style={{ width: "10rem", height: "10rem" }}
								className="card-img-top"
								onClick={() => navigateTo(`/products/${item.id}`)}
							></img>
						</div>

						<div className="card-body">
							<div className="my-5">
								<p className="invisible">
									{price.push(item.price * (item.quantity ? item.quantity : 1))}
								</p>

								<h6>
									{item.quantity} x {item.title} &mdash;
								</h6>
								<button
									className="btn btn-primary rounded btn-lg mx-2"
									onClick={() => {
										updateItemQuantity(
											item.id,
											item.quantity ? item.quantity - 1 : 1
										);
									}}
								>
									-
								</button>
								<button
									className="btn btn-primary rounded btn-lg mx-2"
									onClick={() => {
										updateItemQuantity(
											item.id,
											item.quantity ? item.quantity + 1 : 1
										);
									}}
								>
									+
								</button>
								<button
									className="btn btn-danger btn-lg"
									onClick={() => {
										removeItem(item.id);
									}}
								>
									&times;
								</button>
								<h4>
									{item.price.toString().includes(".")
										? (
												item.price * (item.quantity ? item.quantity : 1)
										  ).toFixed(2)
										: item.price * (item.quantity ? item.quantity : 1) + ".00"}
									$
								</h4>
							</div>
						</div>
					</div>
				))}
			</div>
			<br />
			<br />
			<h1>
				Total amount:
				<span className="text-success">{lodash.sum(price).toFixed(2)}$</span>
			</h1>
			<button className="btn btn-lg btn-danger" onClick={() => emptyCart()}>
				Remove all
			</button>
		</div>
	);
};

export default Cart;
