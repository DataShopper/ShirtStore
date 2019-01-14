import React from 'react'

const ProductForm = props => {
  if (props.state) {
    const handleChange = props.handleChange
    const handleSubmit = props.handleSubmit
    const price = props.state.price
    const name = props.state.name
    const description = props.state.description
    const sizes = props.state.sizes
    const color = props.state.color
    const category = props.state.category

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">
          <input
            name="price"
            type="text"
            placeholder="price"
            onChange={handleChange}
            value={price}
          />
        </label>
        <label htmlFor="name">
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
            value={name}
          />
        </label>
        <label htmlFor="color">
          <input
            name="color"
            type="text"
            placeholder="color"
            onChange={handleChange}
            value={color}
          />
        </label>
        <label htmlFor="description">
          <input
            name="description"
            type="textarea"
            placeholder="desc"
            onChange={handleChange}
            value={description}
          />
        </label>
        <label htmlFor="sizes">
          <input
            name="sizes"
            type="textarea"
            placeholder="size"
            onChange={handleChange}
            value={sizes}
          />
        </label>
        <label htmlFor="category">
          <input
            name="category"
            type="textarea"
            placeholder="category"
            onChange={handleChange}
            value={category}
          />
        </label>
        <button>Add Item</button>
      </form>
    )
  } else {
    const {handleChange, handleSubmit} = props
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">
          <input
            name="price"
            type="text"
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
}

export default ProductForm
