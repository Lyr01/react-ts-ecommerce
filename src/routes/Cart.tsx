import React, { useState } from "react";
import { useCart } from "react-use-cart";
import NavBar from "../components/NavBar";

const Cart = () => {
	const [fullPrice, setFullPrice] = useState(0);
	let price: Number;

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
				<p>Your cart is empty</p>
			</>
		);

	return (
		<>
			<NavBar showAllProducts={false} />
			<h1>Cart ({totalUniqueItems})</h1>

			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<img src={item.image} alt="product" style={{ width: 30 }}></img>
						{item.quantity} x {item.title} &mdash;
						<button
							onClick={() => {
								updateItemQuantity(item.id, item.quantity - 1);
								setFullPrice(fullPrice - item.price);
							}}
						>
							-
						</button>
						<button
							onClick={() => {
								updateItemQuantity(item.id, item.quantity + 1);
								setFullPrice(fullPrice + item.price);
							}}
						>
							+
						</button>
						<button
							onClick={() => {
								removeItem(item.id);
								setFullPrice(fullPrice - item.price * item.quantity);
							}}
						>
							&times;
						</button>
						{(price = item.price * item.quantity)}$
					</li>
				))}
			</ul>

			<h1>{price!.toFixed(2)}$</h1>
			<button onClick={() => emptyCart()}>Remove all</button>
		</>
	);
};

export default Cart;
