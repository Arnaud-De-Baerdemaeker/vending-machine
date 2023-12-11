const Button = (props) => {
	return(
		<button
			onClick={props.clickFunction}
		>
			{props.children}
		</button>
	);
};

export default Button;
