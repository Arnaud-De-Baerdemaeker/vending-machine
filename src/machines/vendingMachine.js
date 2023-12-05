import {createMachine} from "xstate";

const vendingMachine = createMachine(
	{
		id: "distributeur",
		initial: "off",
		states: {
			off: {
				on: {
					turnOn: {
						target: "on",
					},
				},
			},
			on: {
				entry: {
					type: "welcomeScreen",
				},
				initial: "initialization",
				states: {
					initialization: {
						invoke: {
							src: "fetchContent",
							onDone: [
								{
									target: ".ready",
								},
							],
							onError: [
								{
									target: "machineEmpty",
								},
							],
						},
						initial: "ready",
							states: {
								ready: {
									initial: "idle",
									states: {
										idle: {
											on: {
												userSelectsDrink: [
													{
														target: "displayPrice",
														guard: "productAvailable",
													},
													{
														target: "productOutOfStock",
													},
												],
												userInsertsMoney: {
													target: "insertedMoney",
												},
											},
										},
										displayPrice: {
											entry: [
												{
													type: "displayPriceScreen",
												},
												{
													type: "displayInsertedAmount",
												},
											],
											on: {
												userInsertsMoney: [
													{
														target: "finalization",
														guard: "amount >= price",
													},
													{
														target: "displayPrice",
													},
												],
											},
										},
										productOutOfStock: {
											entry: {
												type: "productOutOfStockScreen",
											},
											after: {
												"5000": {
													target: "#distributeur.on.initialization.ready.idle",
													actions: [],
												},
											},
										},
										insertedMoney: {
											entry: {
												type: "insertedMoneyScreen",
											},
											on: {
												userInsertsMoney: {
													target: "insertedMoney",
												},
												userSelectsDrink: [
													{
														target: "finalization",
														guard: "amount >= price",
													},
													{
														target: "insufficientFunds",
													},
												],
											},
										},
										finalization: {
											after: {
												"5000": {
													target: "#distributeur.on.initialization",
													actions: [
														{
															type: "endTransactionScreen",
														},
													],
												},
											},
											states: {
												drinkDelivery: {
													invoke: {
														src: "updateDrinkStock",
														id: "invoke-lazn1",
													},
												},
												giveBackChange: {
													entry: {
														type: "changeAmountScreen",
													},
												},
											},
											always: {
												target: ".giveBackChange",
												guard: "amount > price",
											},
											type: "parallel",
										},
										insufficientFunds: {
											entry: [
												{
													type: "insufficientFundsScreen",
												},
												{
													type: "insertedMoneyScreen",
												},
											],
											on: {
												userInsertsMoney: [
													{
														target: "finalization",
														guard: "amount >= price",
													},
													{
														target: "insufficientFunds",
													},
												],
											},
										},
									},
								},
							},
						},
						machineEmpty: {
							entry: {
								type: "machineEmptyScreen",
							},
							type: "final",
						},
					},
				on: {
					turnOff: {
						target: "off",
					},
				},
			},
		},
	},
	{
		actions: {
			welcomeScreen: ({ context, event }) => {},
			productOutOfStockScreen: ({ context, event }) => {},
			displayPriceScreen: ({ context, event }) => {},
			displayInsertedAmount: ({ context, event }) => {},
			changeAmountScreen: ({ context, event }) => {},
			insufficientFundsScreen: ({ context, event }) => {},
			insertedMoneyScreen: ({ context, event }) => {},
			endTransactionScreen: ({ context, event }) => {},
			machineEmptyScreen: ({ context, event }) => {},
		},
		actors: {
			fetchContent: createMachine({
				/* ... */
			}),
			updateDrinkStock: createMachine({
				/* ... */
			}),
		},
		guards: {
			"productAvailable": ({ context, event }, params) => {
				return false;
			},
			"montant >= prix": ({ context, event }, params) => {
				return false;
			},
			"amount >= price": ({ context, event }, params) => {
				return false;
			},
			"amount > price": ({ context, event }, params) => {
				return false;
			},
		},
		delays: {},
	},
);

export default vendingMachine;
