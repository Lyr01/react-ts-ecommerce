import { useState } from "react";
import { Button, Input } from "reactstrap";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { Product } from "../module";

interface Props {
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ setSearchValue, setCategoryValue }: Props) => {
	const [inputValue, setInputValue] = useState("");
	const [selectCategoryValue, setSelectCategoryValue] = useState("");

	const { data } = useProductsQuery();

	const uniqueCategory: string[] = data?.data
		.map((product: Product) => product.category)
		.filter(
			(value: string, index: number, self: any) => self.indexOf(value) === index
		);

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
				<Input
					placeholder="Search Item..."
					bsSize="lg"
					className="pe-5"
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>

				<Input
					onChange={(e) => {
						setSelectCategoryValue(e.target.value);
					}}
					type="select"
					name="select"
					id="categorySelect"
					className=""
				>
					<option value="default">Filter by category</option>
					{uniqueCategory?.map((category: string) => (
						<option key={category}>{category}</option>
					))}

					<option value="ascending">Price by ascending order</option>

					<option value="descending">Price by descending order</option>
				</Input>
				<Button color="light" type="submit" className="mx-1">
					Search
				</Button>
			</form>
		</div>
	);
};

export default Filter;
