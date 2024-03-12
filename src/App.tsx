import { QueryClient, QueryClientProvider } from 'react-query'
import { UserPages } from './Pages/UserPages/UserPages'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserPages />
		</QueryClientProvider>
	)
}

export default App
