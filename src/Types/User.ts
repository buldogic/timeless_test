export interface User {
	results: {
		login: {
			uuid: string
		}
		id: { value: string }
		name: {
			first: string
			last: string
		}
		email: string
		phone: string
		dob: {
			age: number
			date: string
		}
		location: {
			city: string
			country: string
			state: string
		}
		picture: {
			large: string
		}
		gender: string
	}[]
}
