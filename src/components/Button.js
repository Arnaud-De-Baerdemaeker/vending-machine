const Button = ({clickFunction, children, isDisabled}) => {
	return(
		<button
			onClick={clickFunction}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default Button;
