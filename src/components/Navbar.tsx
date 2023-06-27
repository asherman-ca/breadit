import Link from 'next/link'
import { Icons } from './Icons'
import { Button, buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import { signOut } from 'next-auth/react'
import { UserAccountNav } from './UserAccountNav'

const Navbar = async () => {
	const session = await getAuthSession()

	return (
		<div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
				<Link href='/' className='flex gap-2 items-center'>
					<p className='hidden text-zinc-700 text-sm font-medium md:block'>
						<Icons.logo className='flex gap-2 items-center' />
						Breadit
					</p>
				</Link>

				{session ? (
					<UserAccountNav user={session.user} />
				) : (
					<Link href='/sign-in' className={buttonVariants()}>
						Sign In
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar
