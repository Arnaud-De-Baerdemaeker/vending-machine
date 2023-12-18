const Drink = ({drinkId, drinkName, drinkPrice, drinkStock, service}) => {
	return(
		<article
			id={drinkId}
			onClick={() => {
				service.send({
					type: "SELECT_DRINK",
					selectedDrinkId: drinkId,
					selectedDrinkName: drinkName,
					selectedDrinkPrice: drinkPrice,
					selectedDrinkStock: drinkStock,
				});
			}}
		>
			<h2>{drinkName}</h2>

			<dl>
				<div>
					<dt>Prix</dt>
					<dd>{drinkPrice}€</dd>
				</div>

				<div>
					<dt>Stock</dt>
					<dd>{drinkStock}</dd>
				</div>
			</dl>
		</article>
	);
};

export default Drink;
