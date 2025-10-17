import * as React from "react"
import { useWindowDimensions } from "react-native"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const { width, height } = useWindowDimensions()
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const minSide = Math.min(width, height)
		setIsMobile(minSide < MOBILE_BREAKPOINT)
	}, [width, height])

	return !!isMobile
}
