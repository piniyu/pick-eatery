'use client'
import 'tw-elements/dist/css/tw-elements.min.css'
import { ReactNode, useEffect } from 'react'
import { Ripple, initTE, Modal } from 'tw-elements'

export default function Providers({ children }: { children: ReactNode }) {
	useEffect(() => {
		initTE({ Ripple, Modal })
	}, [])

	return <>{children}</>
}
