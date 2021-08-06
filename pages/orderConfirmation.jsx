import { withRouter } from 'next/router'
import Success from '../components/Success'

const OrderConfirmation = (props) => {
  const { reference, cart, total } = props.router.query

  return <Success reference={reference} cart={cart} total={total} />
}

export default withRouter(OrderConfirmation)
