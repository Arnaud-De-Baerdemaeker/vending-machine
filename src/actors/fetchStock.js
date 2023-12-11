const fetchStock = async () => await fetch("http://localhost:3001/products").then((response) => response.json());

export default fetchStock;
