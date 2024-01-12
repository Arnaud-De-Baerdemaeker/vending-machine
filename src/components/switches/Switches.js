import Button from "../button/Button";

const Switches = ({state, service}) => {
	return(
		<div className="flex justify-center gap-x-5">
			<Button
				clickFunction={() => {
					service.send({type: "TURN_ON"});
				}}
				isDisabled={state.can({type: "TURN_ON"}) ? false : true}
				buttonClass={`w-[70px] h-10 rounded text-slate-100 transition-all duration-500 ${state.matches("turnedOn") ? "bg-gray-400 shadow-none" : "bg-sky-500 shadow-lg hover:shadow-xl active:shadow-none"}`}
			>
				ON
			</Button>

			<Button
				clickFunction={() => {
					service.send({type: "TURN_OFF"});
				}}
				isDisabled={state.can({type: "TURN_OFF"}) ? false : true}
				buttonClass={`w-[70px] h-10 rounded text-slate-100 transition-all duration-500 ${state.matches("turnedOff") ? "bg-gray-400 shadow-none" : "bg-red-700 shadow-lg hover:shadow-xl active:shadow-none"}`}
			>
				OFF
			</Button>
		</div>
	);
};

export default Switches;
