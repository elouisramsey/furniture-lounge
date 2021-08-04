import { withRouter } from 'next/router'
import { useAuthContext } from '../components/context/AuthProvider'
import Success from '../components/Success'

const OrderConfirmation = (props) => {
  const reference = props.router.query.reference

  return <Success reference={reference} />
}

export default withRouter(OrderConfirmation)
