import {createMachine, assign, fromPromise} from "xstate";

import fetchStock from "../apiCalls/fetchStock";

const vendingMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QQJawC4CcUCMCu6YemAxOsQHYDyAZjQNoAMAuoqAA4D2sK6KnFNiAAeiAGyMANCACeiALQAmABwA6ACwBObdvUBGRXoDMisZoCsAX0vTUGbPkLFV5TBUi0aZSlQpNWSCBcPHwCQqIIYnqqjADsynp6sUaMCerKmkbScgiasaqmyobm5vGKiox51rZoWLgERJgulB4UqigUvCgAhgA2KABe3aEUJBACYO0UAG6cANaTdnWOjc1urVNdfYPD-BQIHbMAxrsC-v5CwV1hgRHqWqqxYubPjBLK79mIenGaqinaRj3FL3RSxaogJYOBrOVzuCC+TZ8bZDEYkMCYTCcJrsXrDGjYgC2qih9ScTThGw6W36qL2BxmnBOI3OLEu3GugluiFi5j+Txe5jeqU+skQFT+YKMRk0z006kYJXU4JskNq0PJa3hiMwYG6EBk7QgvTAJDwsAxAGUwCajuhYAARbAUOYXQJXEbhRAZRQFIzqFJmDKxdQvL4IWLxR4fIWaRRGMQJJ4Q0krWEtBFtXX6w0oY2m81Wm1gO2O52uvQBDgcz3chA+v0Bt6aYOhsThqJqComH4VEO8owp9Vk1aUzOqbMGo0ms0WzAASQoc-tAFkJjI3dWQnsvfWio3Ay28m3w5l8rFGEY9MpGCpFb2h-YR+n1uPJ4a7LjujIAArYI4FnOi7LrAa7uBubLujWO51vEXb+uohhXqGmh6Oo4YGLE0TxGIMrKCk14BoOqqpjCFIZjqepTp+eK-v+gEYsBGKruu9CVuy243KAER6JolQaIm5jKAqjCYfhHbKPkKjPBeipxkCVgkcOabka+lE5qo7BYhAeB2lQBC0Ja6BMnMJDCBgwyTN0NCEJgAAUQqMIwACUYzKWRWobO+mnabp6D6f5NBGSZm5BNBXEiIgFhqCKN4Kh8aHmIo4YvEYqjKDeMZ8tKYjKo+yweWO6lTh0y6QGBYAyLOjFLsxoGsZBW6cruvHPKoEhGMJYKGDo7ZivWIYFDGiilE86i5SqNRPipnlvlRua1ZghAQBVVWFpg1q2vaTodK6jVhZxXLcTyUbxqCxiJah6H9cY5RDbhGXlOYKTJPlGqjhRWbzVMZUreu1UbcWpY7S6bFVgdzV1gYYi+mhbxCgYGX4ddOSyvkl6vLlGRaECb3Pqp2pfRpNAdCipyjKFHowcdCAXWIqgtgGJTZUq5gYUR90JlhiaSRYeMzUVRNTiTFBk2i5noJZqjWbZDlOS5bnTYVn0Tt9Iti3slPhUdkW0+UvqmIKwofKkyX9f6jAxPLI1JGh2h6IpU0FZqguqxppV4HQKBHCgYAUOgABieAUBAsAA0xS31eBWuHS1by+peiS5WhPzx+zg3STK40ZfoHz88ralCwtsCeyTPt+4Hweh+Hi0sdH7FQbHdaZY2iEXShaEYZ1vo4UY8RoZJWHEaqFCcBAcBCKR5IcZDNMGOG8iJOYDM6LoBi3ZNapKy7FF0DPtY00YpTpdlj1iLEqElOG8ZW-LiqSR8ySKvnO+F-v1O60fagWFez3PHoUQxoYWvAULQLY0IqHlAGRQL8PqFyRD0Wk5N34RTuG8Bmz0HYJnMAApIuVr4pFUAYMB15pQhiDLAl8hM3YGhQTrCIT9W5IUup3fqiE-idRFCUTICZxpiEoQTLy308wmjobuC+8FzrIT5KwnILxJSJzjGNZUMClLbzgdQ7yNFvx-m9mAMRUMAH5AAVnfCokgRPHDCGHuWVtBFDEIJARs1iqGi0mPPyAVDLGSOHMAxc9eJpWypGEwugWxs36kJbCMYromFMAGJxrtvKlWYuVdcfjdY-GUMvEwt4RoyjISoU8ih+QxgdmYbQKhN5Tw0UI4mpMkEHwho0nihQGbCSPtwjpoYMKKAVPdIUcobwqGUAklW3l1YNL2CScsDobQoGmBiHITVmnfCvPTRmHSWbmG6TdEw54PjjT5JePIR9RnwPGfUnYIxVBQHmWAAAQt0HxABhAAFt0CgMB0k8WeL6LJmRShRD4gGdmqRoy4SiM8F4D0zmaOEUuUu3tfb+yDiHeAjdZ66wSH8H+cQslJW2UJdmnVOaJjiOUI+xEnbvSoRsQkTzXkdDAAAUUJOwdASymkfx4niohCpcpggSIkPu19FSPDAWkSBwJVHWCAA */
		context: {
			welcomeMessage: null,
			drinks: null,
			errorFetching: null,
		},
		id: "distributeur",
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
									target: "ready",
									actions: assign({
										drinks: ({context, event}) => event.output,
									}),
								},
							],
							onError: [
								{
									target: "machineEmpty",
									actions: assign({
										drinks: ({context, event}) => event.error,
									}),
								},
							],
						},
					},
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
										}
									],
									userInsertsMoney: {
										target: "insertedMoney",
									},
								},
							},
							displayPrice: {
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
								after: {
									"5000": {
										target: "#distributeur.turnedOn.ready.idle",
									},
								},
							},
							insertedMoney: {
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
										target: "#distributeur.turnedOn.initialization",
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
					machineEmpty: {
						type: "final",
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
