import Toast from 'react-native-toast-message'

/**
 * Show a toast notification using react-native-toast-message.
 * 
 * Usage:
 *   toast({ title: 'Title', description: 'Message', type: 'success' })
 * 
 * Supported types: 'success', 'error', 'info'
 */
type ToastOptions = {
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info'
  /** Duration in ms (default: 4000) */
  duration?: number
  /** Position: 'top' | 'bottom' (default: 'top') */
  position?: 'top' | 'bottom'
}

function toast({
  title,
  description,
  type = 'success',
  duration = 2000,
  position = 'top',
}: ToastOptions) {
  Toast.show({
    type,
    text1: title,
    text2: description,
    visibilityTime: duration,
    autoHide: true,
    topOffset: position === 'top' ? 20 : 0,
    bottomOffset: position === 'bottom' ? 20 : 0,
  })
}

function useToast() {
  // For API compatibility, return toast and a dummy dismiss
  return {
    toast,
    dismiss: () => Toast.hide(),
  }
}

export { toast, useToast }

