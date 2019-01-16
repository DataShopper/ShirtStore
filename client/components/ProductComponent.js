import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ProductForm} from './index'
import {Input, Button} from 'semantic-ui-react'

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
      <div
        id="allProductscont"
        className="ui three column doubling stackable centered grid row container"
      >
        {products.map(p => {
          return (
            <div style={{width: '260px'}} key={p.id}>
              <div className="ui raised segment">
                <Link to={`/products/${p.id}`} key={p.id}>
                  <p className="ui large header">{p.name}</p>
                  <p className="ui small header">{p.strPrice}</p>
                  <img className="ui centered small image" src={p.imageUrl} />
                  <p className="ui small header">{p.description}</p>
                </Link>
                <div>
                  {admin && (
                    <Button id="removeBtn" onClick={() => removed(p)}>
                      REMOVE
                    </Button>
                  )}
                </div>
              </div>

              <br />
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
