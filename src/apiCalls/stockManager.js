const fetchStock = async () => {
	const request = await fetch("http://localhost:3001/products");
	const response = request.json();
	return response;
};


const updateStock = async (id, name, price, stock) => {
	const data = {
		id: id,
		name: name,
		price: price,
		stock: stock > 0 ? stock - 1 : null
	};

	const request = await fetch(`http://localhost:3001/products/${id}`, {
		method: "PUT",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify(data),
	});
	const response = request.json();
	return response;
};

export {fetchStock, updateStock};
