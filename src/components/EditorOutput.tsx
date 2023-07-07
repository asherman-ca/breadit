'use client'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import CustomImageRenderer from './renderers/CustomImageRenderer'
import CustomCodeRenderer from './renderers/CustomCodeRenderer'

const Output = dynamic(
	async () => (await import('editorjs-react-renderer')).default,
	{
		ssr: false,
	}
)

interface EditorOutputProps {
	content: any
}

const renderers = {
	image: CustomImageRenderer,
	code: CustomCodeRenderer,
}

const style = {
	parapraph: {
		fontSize: '0.875rem',
		lineHeight: '1.25rem',
	},
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
	return (
		<Output
			data={content}
			renderers={renderers}
			className='text-sm'
			style={style}
		/>
	)
}

export default EditorOutput
