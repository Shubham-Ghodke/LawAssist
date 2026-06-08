import { useRegisterSW } from 'virtual:pwa-register/react'
import { X, RefreshCw } from 'lucide-react'

export function PWAPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl border border-white/10 bg-dark-200/90 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-5 max-w-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-medium mb-1">
            {offlineReady ? 'App ready to work offline' : 'New content available'}
          </h3>
          <p className="text-sm text-gray-400">
            {offlineReady 
              ? 'The application has been cached for offline use.'
              : 'Please reload to update the application.'}
          </p>
        </div>
        <button onClick={close} className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      {needRefresh && (
        <button 
          onClick={() => updateServiceWorker(true)}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Application
        </button>
      )}
    </div>
  )
}
