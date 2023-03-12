import { useContext, useState } from "react";
import { Input } from "reactstrap";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { Product } from "../module";
import { filterContext } from "./Home";

import { AiOutlineSearch } from "react-icons/ai";

const Filter = () => {
	const { setSearchValue, setCategoryValue } = useContext(filterContext);

	const [inputValue, setInputValue] = useState("");
	const [selectCategoryValue, setSelectCategoryValue] = useState("");

	const { data } = useProductsQuery();

	const uniqueCategory: string[] = data?.data
		.map((product: Product) => product.category)
		.filter(
			(value: string, index: number, self: any) => self.indexOf(value) === index
		);

	const handleSubmit = () => {
		setSearchValue(inputValue);
		setCategoryValue(selectCategoryValue);
	};
	return (
		<div>
			<form
				className="d-flex flex-md-nowrap flex-wrap"
				onSubmit={(e) => {
					e.preventDefault();
					setSearchValue(inputValue);
					setCategoryValue(selectCategoryValue);
				}}
			>
				<div className="position-relative">
					<Input
						placeholder="Search Item..."
						bsSize="lg"
						className="pe-5 "
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
					/>
					<AiOutlineSearch
						onClick={handleSubmit}
						className="mx-1 mt-2  position-absolute end-0 top-0"
						size={30}
					/>
				</div>
				<Input
					onChange={(e) => {
						setSelectCategoryValue(e.target.value);
					}}
					type="select"
					name="select"
					id="categorySelect"
					className="filter"
				>
					<option value="default">Filter by category</option>
					{uniqueCategory?.map((category: string) => (
						<option key={category}>{category}</option>
					))}

					<option value="ascending">Price by ascending order</option>

					<option value="descending">Price by descending order</option>
				</Input>
				<button type="submit" className="d-none"></button>
			</form>
		</div>
	);
};

export default Filter;
