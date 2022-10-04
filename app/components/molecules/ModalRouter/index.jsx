import {useMatchRoute} from '@tanstack/react-location'
import PropTypes from 'prop-types'

// eslint-disable-next-line atomic-design-hierarchy/hierarchical-import
import NotFoundPage from '@/components/pages/NotFoundPage'
import {notEmpty} from '@/utils/filter-utils'

const ModalRouter = ({base, children, notFound, routes}) => {
  const matchRoute = useMatchRoute()

  const isRoot = Boolean(matchRoute({fuzzy: false, to: base}))
  const route = routes.find(inner =>
    matchRoute({
      fuzzy: inner.fuzzy === true,
      to: [base, inner.path].filter(notEmpty).join('/')
    })
  )

  if (isRoot || route) {
    return (
      <>
        {children}
        {route?.element}
      </>
    )
  }

  return notFound
}

ModalRouter.propTypes = {
  base: PropTypes.string.isRequired,
  children: PropTypes.node,
  notFound: PropTypes.node,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      element: PropTypes.node.isRequired,
      fuzzy: PropTypes.bool,
      path: PropTypes.string.isRequired
    })
  ).isRequired
}

ModalRouter.defaultProps = {
  children: null,
  notFound: <NotFoundPage />
}

export default ModalRouter
