import React, {Component} from 'react'
import {StripeProvider} from 'react-stripe-elements'
import {Navbar} from './components'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_QJqh7Hj9VDs05MOowKlYcWkC">
        <div className="example">
          <Navbar />
          <Routes />
        </div>
      </StripeProvider>
    )
  }
}

export default App
