export const dateForm = (time: string): string => {
	const date: Date = new Date(time)
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}
	const formattedDate: string = date.toLocaleDateString('en-GB', options)
	return formattedDate
}
