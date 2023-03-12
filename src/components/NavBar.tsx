import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import {
	Badge,
	Collapse,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarText,
	NavbarToggler,
	NavItem,
	NavLink,
} from "reactstrap";

import Filter from "./Filter";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { totalItems } = useCart();

	const toggle = () => setIsOpen(!isOpen);
	return (
		<Navbar sticky="top" className="navbar-light bg-light" light expand="md">
			<NavbarBrand href="https://lyr01.github.io/">
				<strong> Hamza Khan</strong>
			</NavbarBrand>

			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="me-auto" navbar>
					<NavItem className="mt-1">
						<NavLink href="https://lyr01.github.io/react-ts-ecommerce/">
							Home
						</NavLink>
					</NavItem>
					<NavItem className="mt-1">
						<NavLink href="https://github.com/lyr01">GitHub</NavLink>
					</NavItem>
					<NavItem className="mx-md-5">
						<Filter />
					</NavItem>
				</Nav>
				<NavbarText>
					<Link to="/cart">
						<AiOutlineShoppingCart size={30} />
					</Link>
					<Badge className="bg-danger">{totalItems}</Badge>
				</NavbarText>
			</Collapse>
		</Navbar>
	);
};

export default NavBar;
