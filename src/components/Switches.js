import Button from "./Button";

const Switches = ({state, service}) => {
	return(
		<div>
			<Button
				clickFunction={() => {
					state.matches("turnedOff") ? service.send({type: "TURN_ON"}) : alert("Machine is already on !");
				}}
			>
				ON
			</Button>
			<Button
				clickFunction={() => {
					!state.matches("turnedOff") ? service.send({type: "TURN_OFF"}) : alert("Machine is already off !");
				}}
			>
				OFF
			</Button>
		</div>
	);
};

export default Switches;
