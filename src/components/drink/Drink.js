const Drink = ({state, drinkId, drinkName, drinkPrice, drinkStock, service}) => {
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
			className={`flex flex-col gap-y-[25px] w-[250px] border-solid border rounded p-2.5 bg-gray-100 transition-all duration-500 ${state.matches({turnedOn: {ready: "amountInserted"}}) ? "cursor-pointer shadow-lg hover:shadow-2xl border-black text-black" : "border-neutral-300 text-neutral-300"} ${state.matches({turnedOn: {ready: "selection"}}) && drinkId == state.context.selectedDrinkId ? "shadow-lg bg-slate-700 text-slate-100" : ""}`}
		>
			<h2 className="text-xl text-center font-medium">{drinkName}</h2>

			<dl className="flex justify-between">
				<div>
					<dt className="text-xs">Prix</dt>
					<dd>{drinkPrice}€</dd>
				</div>

				<div>
					<dt className="text-xs">Stock</dt>
					<dd className="text-end">{drinkStock}</dd>
				</div>
			</dl>
		</article>
	);
};

export default Drink;
