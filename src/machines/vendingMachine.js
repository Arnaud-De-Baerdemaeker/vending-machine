import {createMachine, assign, fromPromise} from "xstate";

import fetchStock from "../apiCalls/fetchStock";

const vendingMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QDcwDsIEs1QLIEMBjAC2zAGIAXAVwCc0B5AMyYG0AGAXUVAAcB7WJkqZ+aHiAAeiACwAmADQgAnogAcARgB0MgJz797AOzs5RuTIC+lpagzY8RUmjBaa9SMyZU6jNB24kEAEhETEJaQQNNSMtOXYAZmizXSNUowSlVSjTWLkYgFZdBIKjIw0ANnY1a1t0LBwCEjI3X080H3ovAIkQ4VFxIMjovMTktImMrMRUiq0jGKqEhPZTAorakDsGx2aXVo8IBjQtbH78ABtMAC98MI6IMVdsZH4Aa1dthybnV3cXI4nM4iS43O4DBAvfiEcFiAI9IJ9e4RRAFDRyLTogrsfQVOQaBJqAoyaYIArkrS6AorPEJGTVNJyTZfRpOFr-dqnNDnK63e7kMC0Wj8WhaXgXO5MEUAWy0LN2vwOAOOXJ5YPukLQrxh93hXF6gn64SGqLkGKxON0eIJRJJKlkeMp+jUajkePYehkCWZ9W+bP2HMBWkIYko6EoADEwJQSJByAi+IbkSaECUElp2Hjqa7qUUKmpSQSChj6RUNPSNKVdDJzD77Ky9n82kGQ2gw22ozHiHHWBpAonQgMUamKunM3JsxOSlaC-ach7MesLGYyvjdHWdj92c2VYLhbRO3soABhUPh8i0aO0ZQJ4JJocp4vmieW62E4mkmTorTY1bor1FOWRgFBufqNkqnKXvgEDKKcEAXBQ1CwIKACSaDIbQlCwLgTw3vqiL3saoCRBUNaLqR5L-vSdKFmicyVmWJjlgkZhqBsNhbL6DaKoGKpQTBWj4NK-DUG2aEYWGEDkI8+xQh8cpcQq26HHxYDQbBQkiWJ6GCpJmrarC-hcLeSIPsRiBAdoS7mOk7AEkYFSFhRWjLPSxgLHIVrAaB3HKcqJz8RpwmiZQ4m6XGe4imKEqUFKtCyvKW4BjuAVqQJmkhWFmGQPp0KGXq-Z3oORFSBZNYYnIdKlPIwEaFStGpFoajLNWCzoisMg1BxiX+k2KmpepgnBdpElxkhgoAMpgAhhBYQAIrQ2BvCZhGDOZCC0loWYenZxa6OwBSFsk5GVQ5boJPoPlKcl-VaIFQ1aaFOnZVJ420FNM3zYtaDLX2BrFWtpUIDZP7FPtah-sYZa0RUcwVEuLE1uSCxGFdSV9f5d1pUFj1ZZJ5BvXj2G4StAPDuWxYZn+JjLKRX60WRrnuXiq7UmjvUQUG93IZ9AzkMgoIQHcYAfWAs0DKTRqAyRlVbS+FZ7QdhaVRi8NlsYmg4gsIHdYp6Oc6pg082L-IC1cQthqL4twn9BFkymm3bQrnlK3OGgEtoasaMBnn0roLrs+BvEDQJvDChA1CzQw1CUMwE2UNCbzkJIsCUMLglMGGtAABS-uwACU-N6xzwdY4NYf8BHUcx3HCeEMt+EDlLw4g0UF3VJDDkaE53sndWEMowHuv1tdGOQdjWgRtgoJ8nzkvJutxLpgxCRlHViQVLopLxJoGbmESlYyF+eiBzxKVlwJU9oDPhnJ6n6f4Jngq56sBdFyP+ul-dV837qjdFc3R8phMQvlxPid8dpsjmHYFtJc6JjBt08qfPy49BrYFgNQFgmBCCYHDBGUSEBYDxn-qZEqkRyjpjRKUckyxzqHTdrDWIpR8j4jMDtNQVhNhoErnACQPVGz-UAetAAtI5OcojkE3WVCwQRC8galFJP7DEMQcRejsroM0HDJFj0BLIsyQN8gFAzFmQkU48yzmyCxIxr87K03WPIBI7E6gfxLufYEmBf76NIdLRAywxwmJzNOfMn5yxbT0FSFimhSJ0m0QbE4rZ2yRmjLGCAeiyGIFhjIFyXp9DRDsi6dYpJSixAqBMb2GgGSaHXMPTcrjbqRQPMk5wJ4zxtjST4jaGQqZ2QqXTD0VpPz4gzM1N0qwOEVJkDrZxtSg7n0Cu04cR9YgrzXvtRxahUiFg9Fkhi3s8SVVdKRWJX8J6YHgmABZj58jkVXuUNZm9aKVFgdaTQEMd6oxqWBM+t17oZRGuFVJdshFAwqSUJqrorRJA0VQ+h2RvZejiDEEY2JljFg+dMr5KCuYT2NtbQG3jFn+xuasjeGyjBHVdM88slZizZnRZxFxsyfkTwrlXWONcmDx0Tpcxe1yVl3I3lvBh1Q96GMJEkcsVpjlzInj-XkhkeVAz0EY-l691mbLdi6NQoqXT-gqeUJknzfJSNQZfae8r7haAgN9N4c1pqYFQNeRVkQl7EoFY4oVcLUhGOYS6MYBIvROIZTM75mNv7mvVAMLQUAHVgAAEJEDeMeYg+AcAXKBXIyIMRdAZiSPSaqBT6pzh3jA4w+RTAsVIqsKZwbMUmuxWg9CmCmDYNwR2Ah8AM36JdcsN1aqHkMNhj+GylRKhVWlbdaUvUACi0peCUGyE3TNpojH7WicYDRxgj5bLsidaBMh4ZUnYtYIAA */
		context: {
			welcomeMessage: null,
			drinks: null,
			totalDrinks: null,
			errorFetching: null,
			insertedAmount: 0,
		},
		id: "vendingMachine",
		initial: "turnedOff",
		states: {
			turnedOff: {
				on: {
					turnOn: {
						target: "turnedOn",
					},
				},
			},
			turnedOn: {
				initial: "initialization",
				states: {
					initialization: {
						invoke: {
							src: fromPromise(() => fetchStock()),
							onDone: [
								{
									target: "contentFetched",
									actions: assign({
										drinks: ({_, event}) => event.output,
										totalDrinks: ({_, event}) => {
											let
												total = null,
												entries = event.output,
												i
											;

											for(i = 0; i < entries.length; i++) {
												total = total + entries[i].stock;
											}

											return total;
										},
									}),
								},
							],
							onError: [
								{
									target: "errorFetchingContent",
									actions: assign({
										drinks: ({_, event}) => event.error,
									}),
								},
							],
						},
					},
					contentFetched: {
						always: [
							{
								target: "ready",
								guard: ({context}) => {
									return context.totalDrinks > 0;
								},
							},
							{
								target: "machineEmpty",
							},
						],
					},
					errorFetchingContent: {
						on: {
							retry: {
								target: "initialization",
							},
						},
					},
					ready: {
						initial: "idle",
						states: {
							idle: {
								on: {
									userInsertsMoney: {
										target: "amountInserted",
										actions: assign({
											insertedAmount: ({context, event}) => (
												context.insertedAmount = context.insertedAmount + event.value
											),
										}),
									},
								},
							},
							amountInserted: {
								on: {
									userSelectsDrink: [
										{
											target: "selection",
											guard: "productStock > 0",
										},
										{
											target: "productOutOfStock",
										},
									],
									userInsertsMoney: {
										target: "amountInserted",
										actions: assign({
											insertedAmount: ({context, event}) => (
												context.insertedAmount = context.insertedAmount + event.value
											),
										})
									},
									returnMoney: {
										target: "idle",
										actions: assign({
											insertedAmount: ({context, event}) => (
												context.insertedAmount = 0
											),
										})
									}
								},
							},
							selection: {
								on: {
									validateSelection: [
										{
											target: "Finalization",
											guard: "amountInserted >= price",
										},
										{
											target: "insufficientFunds",
										},
									],
								},
							},
							productOutOfStock: {
								after: {
									"5000": {
										target: "#vendingMachine.turnedOn.ready.amountInserted",
										actions: [],
										meta: {},
									},
								},
							},
							Finalization: {
								after: {
									"5000": {
										target: "#vendingMachine.turnedOn.initialization",
										actions: [],
										meta: {},
									},
								},
								states: {
									drinkDelivery: {
										invoke: {
											src: "updateDrinkStock",
											id: "invoke-lazn1",
										},
									},
									giveBackChange: {},
								},
								always: {
									target: ".giveBackChange",
									guard: "amount > price",
								},
								type: "parallel",
							},
							insufficientFunds: {
								always: {
									target: "amountInserted",
								},
							},
						},
					},
					machineEmpty: {
						type: "final",
					},
				},
				on: {
					turnOff: {
						target: "turnedOff",
					},
				},
			},
		},
		on: {
			turnOff: {
				target: ".turnedOff",
			},
		},
	},
	{
		actors: {
			updateDrinkStock: createMachine({}),
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
