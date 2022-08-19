import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import NavBar from "../components/NavBar";
const lodash = require("lodash");

const Cart = () => {
	let price: Number[] = [0];

	useEffect(() => {
		document.body.style.backgroundColor = "#adb5bd";
	}, []);

	const {
		isEmpty,
		totalUniqueItems,
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
			<h1>Cart ({totalUniqueItems})</h1>

			<ul className="list-unstyled">
				{items.map((item) => (
					<li key={item.id} className="my-5">
						<p className="invisible">
							{price.push(item.price * item!.quantity)}
						</p>
						<Link
							to={`/products/${item.id}`}
							key={item.id}
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							<img src={item.image} alt="product" style={{ width: 100 }}></img>
						</Link>
						<h6>
							{item.quantity} x {item.title} &mdash;
						</h6>
						<button
							className="btn btn-primary rounded btn-lg mx-2"
							onClick={() => {
								updateItemQuantity(item.id, item!.quantity - 1);
							}}
						>
							-
						</button>
						<button
							className="btn btn-primary rounded btn-lg mx-2"
							onClick={() => {
								updateItemQuantity(item.id, item!.quantity + 1);
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
						<h4>{item.price * item!.quantity}$</h4>
					</li>
				))}
			</ul>

			<h1>
				Total amount:{" "}
				<span className="text-success">{lodash.sum(price).toFixed(1)}0$</span>
			</h1>
			<button className="btn btn-lg btn-danger" onClick={() => emptyCart()}>
				Remove all
			</button>
		</div>
	);
};

export default Cart;
