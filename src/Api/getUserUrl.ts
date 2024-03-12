const baseUrl: string = 'https://randomuser.me/'

const USERCOUNT: number = 500

export const getUserUlr = (url: string = baseUrl): string => {
	return `${url}api/?results=${USERCOUNT}`
}
