import { Platform, useWindowDimensions } from 'react-native'

export function useIsTablet(): boolean {
  const { width, height } = useWindowDimensions()

  const isLargeScreen = Math.min(width, height) >= 768
  const isPad = Platform.OS === 'ios' && (Platform as any).isPad === true

  return isPad || isLargeScreen
}


