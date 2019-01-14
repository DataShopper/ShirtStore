import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ProductForm} from './index'
import {Button} from 'semantic-ui-react'

const ProductComponent = props => {
  const products = props.allProducts || []
  const admin = props.user.admin
  const {handleSubmit, handleChange, removed} = props
  return (
    <div>
      {admin && (
        <ProductForm
          handleSubmit={handleSubmit}
          removed={removed}
          handleChange={handleChange}
        />
      )}
      <br />
      <br />
      <div className="ui three column doubling stackable centered padded grid row container">
        {products.map(p => {
          return (
            <div key={p.id}>
              <Link to={`/products/${p.id}`} key={p.id}>
                <div className="ui raised segment">
                  <p className="ui large header">{p.name}</p>
                  <p className="ui small header">{p.price}</p>
                  <img className="ui centered small image" src={p.imageUrl} />
                  <p className="ui small header">{p.description}</p>
                </div>
              </Link>
              <div>
                <p>{p.name}</p>
                <p>{p.strPrice}</p>
                <img src={p.imageUrl} />
                <p>{p.description}</p>

                {admin && <Button onClick={() => removed(p)}>REMOVE</Button>}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    user: state.user,
    allProducts: state.products
  }
}

export default connect(mapStateToProps)(ProductComponent)
