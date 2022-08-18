import React, { useState } from "react";
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
import AllProducts from "../routes/AllProducts";
import Filter from "./Filter";

interface Props {
	showAllProducts?: boolean;
}

const NavBar = ({ showAllProducts = true }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [categoryValue, setCategoryValue] = useState("");

	const { totalItems } = useCart();

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar sticky="top" className="navbar-dark bg-dark" light expand="md">
				<NavbarBrand href="/">React E-commerce</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem className="mt-1">
							<NavLink href="https://github.com/lyr01">GitHub</NavLink>
						</NavItem>
						<NavItem className="mx-5">
							<Filter
								setSearchValue={setSearchValue}
								setCategoryValue={setCategoryValue}
							/>
						</NavItem>
					</Nav>
					<NavbarText>
						<Link to="/cart">Cart</Link>
						<Badge className="bg-danger">{totalItems}</Badge>
					</NavbarText>
					<NavbarText className="mx-4">Sign Up</NavbarText>
				</Collapse>
			</Navbar>
			{showAllProducts ? (
				<AllProducts
					searchValue={searchValue.toLowerCase()}
					categoryValue={categoryValue.toLowerCase()}
				/>
			) : null}
		</div>
	);
};

export default NavBar;
