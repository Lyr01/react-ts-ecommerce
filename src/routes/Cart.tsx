import React from "react";
import { useCart } from "react-use-cart";
import NavBar from "../components/NavBar";

const Cart = () => {
	const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
		useCart();

	if (isEmpty)
		return (
			<>
				<NavBar showAllProducts={false} />
				<p>Your cart is empty</p>;
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
							onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
						>
							-
						</button>
						<button
							onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
						>
							+
						</button>
						<button onClick={() => removeItem(item.id)}>&times;</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Cart;
