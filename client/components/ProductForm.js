import React from 'react'

const ProductForm = props => {
  const {handleChange, handleSubmit} = props
  return (
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
      <label htmlFor="category">
        <input
          name="category"
          type="textarea"
          placeholder="category"
          onChange={handleChange}
        />
      </label>
      <button>Add Item</button>
    </form>
  )
}

export default ProductForm
