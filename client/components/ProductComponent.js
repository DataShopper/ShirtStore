import React from 'react'
import {Link} from 'react-router-dom'

const ProducComponent = props => {
  const products = props.state.products || []
  const user = props.user.admin
  const {handleSubmit, handleChange} = props
  return (
    <div>
      {user && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="price">
            <input
              name="price"
              type="number"
              placeholder="price"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            <input
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="color">
            <input
              name="color"
              type="text"
              placeholder="color"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <input
              name="description"
              type="textarea"
              placeholder="desc"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="sizes">
            <input
              name="sizes"
              type="textarea"
              placeholder="size"
              onChange={handleChange}
            />
          </label>
          <button>Add Item</button>
        </form>
      )}
      {products.map(p => {
        return (
          <Link to={`/products/${p.id}`} key={p.id}>
            <div>
              <p>{p.name}</p>
              <p>{p.price}</p>
              <img src={p.imageUrl} />
              <p>{p.description}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProducComponent
