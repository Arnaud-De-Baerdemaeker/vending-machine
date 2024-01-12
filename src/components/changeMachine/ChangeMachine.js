import Button from "../button/Button";

const ChangeMachine = ({state, service}) => {
	const coins = [0.05, 0.10, 0.20, 0.50, 1, 2];

	return(
		<div className="flex flex-col gap-y-[25px]">
			<div className="text-3xl font-bold text-end">{state.context.insertedAmount}€</div>

			<div className="flex flex-wrap gap-2.5 justify-between">
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
						buttonClass={`w-[50px] rounded transition-all duration-500 ${state.matches({turnedOn: {ready: "idle"}}) || state.matches({turnedOn: {ready: "amountInserted"}}) ? "shadow-lg hover:shadow-2xl bg-slate-700 text-slate-100" : "bg-neutral-300 text-neutral-500 shadow-none"}`}
					>
						{coin}€
					</Button>
				))}

				<Button
					clickFunction={() => {
						service.send({type: "RETURN_MONEY"});
					}}
					isDisabled={state.can({type: "INSERT_MONEY"}) || state.can({type: "INSERT_MONEY_AGAIN"}) ? false : true}
					buttonClass={`border-solid border rounded transition-all duration-500 ${state.matches({turnedOn: {ready: "idle"}}) || state.matches({turnedOn: {ready: "amountInserted"}}) ? "shadow-lg hover:shadow-2xl border-slate-700 text-slate-700" : "border-neutral-300 text-neutral-300 shadow-none"}`}
				>
					Retourner argent
				</Button>
			</div>
		</div>
	);
};

export default ChangeMachine;
