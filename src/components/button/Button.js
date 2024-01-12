const Button = ({clickFunction, children, isDisabled, buttonClass}) => {
	return(
		<button
			onClick={clickFunction}
			disabled={isDisabled}
			className={buttonClass}
		>
			{children}
		</button>
	);
};

export default Button;
