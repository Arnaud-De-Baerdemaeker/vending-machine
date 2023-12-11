const Drink = (props) => {
	return(
		<article>
			<h2>{props.drinkName}</h2>

			<dl>
				<div>
					<dt>Prix</dt>
					<dd>{props.drinkPrice}€</dd>
				</div>

				<div>
					<dt>Stock</dt>
					<dd>{props.drinkStock}</dd>
				</div>
			</dl>
		</article>
	);
};

export default Drink;
