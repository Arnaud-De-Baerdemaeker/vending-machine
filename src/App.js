import {useEffect} from 'react';
import {useMachine} from '@xstate/react';

import vendingMachine from './machines/vendingMachine';

import Button from './components/Button';
import Drink from './components/Drink';

import './App.css';

const App = () => {
	const [state, send] = useMachine(vendingMachine);

	const coins = [0.05, 0.10, 0.20, 0.50, 1, 2];

	useEffect(() => {console.log(state)}, [state]);

	return (
		<main className="App">
			<div>
				<Button
					clickFunction={() => {
						state.matches("turnedOff") ? send({type: "turnOn"}) : alert("Machine is already on !")
					}}
				>
					ON
				</Button>
				<Button
					clickFunction={() => {
						!state.matches("turnedOff") ? send({type: "turnOff"}) : alert("Machine is already off !")
					}}
				>
					OFF
				</Button>
			</div>

			{state.matches({turnedOn: "ready"})
				&& (
					<div>
						<div>
							{state.context.drinks.map(drink => (
								<Drink
									key={drink.id}
									drinkName={drink.name}
									drinkPrice={drink.price}
									drinkStock={drink.stock}
								/>
							))}
						</div>

						<div>
							<div>{state.context.insertedAmount}€</div>

							<div>
								{coins.map((coin, index) => (
									<Button
										key={index}
										id={coin}
										clickFunction={() => {
											send({
												type: "userInsertsMoney",
												value: coin
											});
										}}
									>
										{coin}€
									</Button>
								))}
								<Button
									clickFunction={() => {
										send({type: "returnMoney"});
									}}
								>
									Annuler
								</Button>
							</div>
						</div>
					</div>
				)
			}
		</main>
	);
};

export default App;
