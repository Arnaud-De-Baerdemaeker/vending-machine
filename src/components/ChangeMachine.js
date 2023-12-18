import Button from "./Button";

const ChangeMachine = ({state, service}) => {
	const coins = [0.05, 0.10, 0.20, 0.50, 1, 2];

	return(
		<div>
			<div>{state.context.insertedAmount}€</div>

			<div>
				{coins.map((coin, index) => (
					<Button
						key={index}
						id={coin}
						clickFunction={() => {
							service.send({
								type: "INSERT_MONEY",
								value: coin
							});
						}}
					>
						{coin}€
					</Button>
				))}
				<Button
					clickFunction={() => {
						service.send({type: "RETURN_MONEY"});
					}}
				>
					Annuler
				</Button>
			</div>
		</div>
	);
};

export default ChangeMachine;
