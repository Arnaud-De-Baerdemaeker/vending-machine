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
							state.context.insertedAmount > 0
							? service.send({
								type: "INSERT_MONEY_AGAIN",
								value: coin
							})
							: service.send({
								type: "INSERT_MONEY",
								value: coin
							})
						}}
						isDisabled={state.can({type: "INSERT_MONEY"}) || state.can({type: "INSERT_MONEY_AGAIN"}) ? false : true}
					>
						{coin}€
					</Button>
				))}
				<Button
					clickFunction={() => {
						service.send({type: "RETURN_MONEY"});
					}}
					isDisabled={state.can({type: "INSERT_MONEY"}) || state.can({type: "INSERT_MONEY_AGAIN"}) ? false : true}
				>
					Retourner argent
				</Button>
			</div>
		</div>
	);
};

export default ChangeMachine;
