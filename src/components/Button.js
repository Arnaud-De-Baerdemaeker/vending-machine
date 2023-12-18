const Button = ({clickFunction, children}) => {
	return(
		<button
			onClick={clickFunction}
		>
			{children}
		</button>
	);
};

export default Button;
