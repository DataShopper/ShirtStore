import React from 'react'
import {Link} from 'react-router-dom'

const ProducComponent = props => {
  const products = props.state.products || []
  const user = props.user.admin
  const {handleSubmit, handleChange} = props
  return (
    <div>
      <div>
        {user && (
          <form className="ui form" onSubmit={handleSubmit}>
            <label htmlFor="price">
              <input
                className="field"
                name="price"
                type="number"
                placeholder="price"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              <input
                className="field"
                name="name"
                type="text"
                placeholder="name"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="color">
              <input
                className="field"
                name="color"
                type="text"
                placeholder="color"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="description">
              <input
                className="field"
                name="description"
                type="text"
                placeholder="desc"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="sizes">
              <input
                className="field"
                name="sizes"
                type="text"
                placeholder="size"
                onChange={handleChange}
              />
            </label>
            <br />
            <div className="ui one column doubling stackable centered grid row container">
              <div>
                <div className="ui centered animated fade button">
                  <div className="visible content">SUBMIT</div>
                  <div className="hidden content">Submit</div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <br />
      <br />
      <div className="ui three column doubling stackable centered padded grid row container">
        {products.map(p => {
          return (
            <Link to={`/products/${p.id}`} key={p.id}>
              <div className="ui raised segment">
                <p className="ui large header">{p.name}</p>
                <p className="ui small header">{p.price}</p>
                <img className="ui centered small image" src={p.imageUrl} />
                <p className="ui small header">{p.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProducComponent
