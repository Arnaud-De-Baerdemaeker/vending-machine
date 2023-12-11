import {useMachine} from '@xstate/react';

import vendingMachine from './machines/vendingMachine';

import Button from './components/Button';
import Drink from './components/Drink';

import './App.css';

const App = () => {
	const [state, send] = useMachine(vendingMachine);

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

			<div>
				{state.matches({turnedOn: {ready: "idle"}})
					? state.context.drinks.map(drink => (
						<Drink
							key={drink.id}
							drinkName={drink.name}
							drinkPrice={drink.price}
							drinkStock={drink.stock}
						/>
					))
					: null
				}
			</div>
		</main>
	);
};

export default App;
