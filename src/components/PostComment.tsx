'use client'
import { FC, useRef } from 'react'
import { UserAvatar } from './UserAvatar'
import { CommentVote, User } from '@prisma/client'

type ExtendedComment = Comment & {
	votes: CommentVote[]
	author: User
}

interface PostCommentProps {
	comment: ExtendedComment
}

const PostComment: FC<PostCommentProps> = ({ comment }) => {
	const commentRef = useRef<HTMLDivElement>(null)

	return (
		<div ref={commentRef} className='flex flex-col'>
			<div className='flex items-center'>
				<UserAvatar
					user={{
						name: comment.author.name,
						image: comment.author.image,
					}}
				/>
			</div>
		</div>
	)
}

export default PostComment
