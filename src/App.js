import {createActor} from 'xstate';
import {useMachine} from '@xstate/react';

import vendingMachine from './machines/vendingMachine';

import './App.css';
import { useEffect } from 'react';

function App() {
	const [state, send] = useMachine(vendingMachine);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<div className="App">
			<button onClick={() => {
				state.value === "off" ? send({type: "turnOn"}) : alert("Machine is already on !")
			}}>
				Turn on
			</button>
			<button onClick={() => {
				state.value !== "off" ? send({type: "turnOff"}) : alert("Machine is already off !")
			}}>
				Turn off
			</button>
		</div>
	);
}

export default App;
