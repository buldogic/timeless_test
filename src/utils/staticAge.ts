interface AgeStatistics {
	[key: string]: number
	'11 to 20': number
	'21 to 30': number
	'31 to 40': number
	'41 to 50': number
	'51+': number
}

const calculateAgeStatistics = (ages: number[]): AgeStatistics => {
	const ageStatistics: AgeStatistics = {
		'11 to 20': 0,
		'21 to 30': 0,
		'31 to 40': 0,
		'41 to 50': 0,
		'51+': 0,
	}

	ages.forEach((age) => {
		if (age >= 11 && age <= 20) {
			ageStatistics['11 to 20']++
		} else if (age >= 21 && age <= 30) {
			ageStatistics['21 to 30']++
		} else if (age >= 31 && age <= 40) {
			ageStatistics['31 to 40']++
		} else if (age >= 41 && age <= 50) {
			ageStatistics['41 to 50']++
		} else {
			ageStatistics['51+']++
		}
	})

	return ageStatistics
}

export default calculateAgeStatistics
