'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
