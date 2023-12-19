import Button from "./Button";

const Switches = ({state, service}) => {
	return(
		<div>
			<Button
				clickFunction={() => {
					service.send({type: "TURN_ON"});
				}}
				isDisabled={state.can({type: "TURN_ON"}) ? false : true}
			>
				ON
			</Button>
			<Button
				clickFunction={() => {
					service.send({type: "TURN_OFF"});
				}}
				isDisabled={state.can({type: "TURN_OFF"}) ? false : true}
			>
				OFF
			</Button>
		</div>
	);
};

export default Switches;
