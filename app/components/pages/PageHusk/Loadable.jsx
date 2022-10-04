import PageLoadingIndicator from '@/components/atoms/PageLoadingIndicator'
import loadable from '@/utils/loadable'

export default loadable(() => import('./index'), {
  fallback: <PageLoadingIndicator />
})
