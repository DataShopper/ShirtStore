import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ProductForm} from './index'

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
      {products.map(p => {
        return (
          <div key={p.id}>
            <Link to={`/products/${p.id}`}>
              <div>
                <p>{p.name}</p>
                <p>{p.price}</p>
                <img src={p.imageUrl} />
                <p>{p.description}</p>
              </div>
            </Link>
            <div>
              {admin && <button onClick={() => removed(p)}>remove</button>}
            </div>
          </div>
        )
      })}
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
