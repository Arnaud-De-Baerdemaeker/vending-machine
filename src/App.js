import {useMachine} from "@xstate/react";

import vendingMachine from "./machines/vendingMachine";

import Switches from "./components/switches/Switches";
import Button from "./components/button/Button";
import ChangeMachine from "./components/changeMachine/ChangeMachine";
import Drink from "./components/drink/Drink";
import { useEffect } from "react";

const App = () => {
	const [state, send, service] = useMachine(vendingMachine);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<main className="w-[1000px] flex flex-col gap-y-[50px]">
			<Switches
				state={state}
				service={service}
			/>

			{state.matches({turnedOn: "ready"})
				&& (
					<div className="flex flex-row gap-x-[50px]">
						<div className="flex flex-col gap-y-[25px]">
							<div className="flex flex-wrap gap-10 justify-between">
								{state.context.drinks.map(drink => (
									<Drink
										key={drink.id}
										state={state}
										drinkId={drink.id}
										drinkName={drink.name}
										drinkPrice={drink.price}
										drinkStock={drink.stock}
										service={service}
									/>
								))}
							</div>

							<div className="flex justify-center gap-10">
								<Button
									clickFunction={() => {
										send({type: "VALIDATE_SELECTION"});
									}}
									isDisabled={state.can({type: "VALIDATE_SELECTION"}) ? false : true}
									buttonClass={`w-40 h-10 rounded transition-all duration-500 ${state.matches({turnedOn: {ready: "selection"}}) ? "shadow-lg hover:shadow-2xl bg-slate-700 text-slate-100" : "bg-neutral-300 text-neutral-500 shadow-none"}`}
								>
									Valider sélection
								</Button>

								<Button
									clickFunction={() => {
										send({type: "CANCEL_SELECTION"});
									}}
									isDisabled={state.can({type: "CANCEL_SELECTION"}) ? false : true}
									buttonClass={`w-40 h-10 border-solid border rounded transition-all duration-500 ${state.matches({turnedOn: {ready: "selection"}}) ? "shadow-lg hover:shadow-2xl border-slate-700 text-slate-700" : "border-neutral-300 text-neutral-300 shadow-none"}`}
								>
									Annuler sélection
								</Button>
							</div>
						</div>

						<ChangeMachine
							state={state}
							service={service}
						/>
					</div>
				)
			}
		</main>
	);
};

export default App;
