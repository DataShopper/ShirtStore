// import React, {Component} from 'react'

// import {Elements, StripeProvider} from 'react-stripe-elements';
// import {Navbar} from './components'
// import Routes from './routes'

// class App extends Component {
//   render() {

//     return (
//       <div>
//         <StripeProvider apiKey='pk_test_QJqh7Hj9VDs05MOowKlYcWkC'>
//         <Navbar />
//         <Routes />
//         </StripeProvider>
//       </div>
//     )
//   }
// }

// export default App

import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutContainer from './components/CheckoutContainer'
import {Navbar} from './components'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <Navbar />
          <Routes />
        </div>
      </StripeProvider>
    )
  }
}

export default App
