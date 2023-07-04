import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubredditSubscriptionValidator } from '@/lib/validators/subreddit'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { subredditId } = SubredditSubscriptionValidator.parse(body)

		// check if user has already subscribed or not
		const subscriptionExists = await db.subscription.findFirst({
			where: {
				subredditId,
				userId: session.user.id,
			},
		})

		if (!subscriptionExists) {
			return new Response(
				"You've not been subscribed to this subreddit, yet.",
				{
					status: 400,
				}
			)
		}

		// check if user is the creator of the subreddit
		const subreddit = await db.subreddit.findFirst({
			where: {
				id: subredditId,
				creatorId: session.user.id,
			},
		})

		if (subreddit) {
			return new Response(
				"You can't unsubscribe from a subreddit you created.",
				{
					status: 400,
				}
			)
		}

		// delete subscription
		await db.subscription.delete({
			where: {
				userId_subredditId: {
					subredditId,
					userId: session.user.id,
				},
			},
		})

		return new Response(subredditId)
	} catch (error) {
		// error
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 })
		}

		return new Response(
			'Could not unsubscribe from subreddit at this time. Please try later',
			{ status: 500 }
		)
	}
}