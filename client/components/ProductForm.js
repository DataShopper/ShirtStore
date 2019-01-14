import React from 'react'

class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      price: '',
      name: '',
      color: ''
    }
  }
  render() {
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
        <form className="ui-form" onSubmit={handleSubmit}>
          <label htmlFor="price">
            <input
              className="field"
              name="price"
              type="text"
              placeholder="price"
              onChange={handleChange}
              value={price}
            />
          </label>
          <label htmlFor="name">
            <input
              className="field"
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
              value={name}
            />
          </label>
          <label htmlFor="color">
            <input
              className="field"
              name="color"
              type="text"
              placeholder="color"
              onChange={handleChange}
              value={color}
            />
          </label>
          <label htmlFor="description">
            <input
              className="field"
              name="description"
              type="text"
              placeholder="desc"
              onChange={handleChange}
              value={description}
            />
          </label>
          <label htmlFor="sizes">
            <input
              className="field"
              name="sizes"
              type="text"
              placeholder="size"
              onChange={handleChange}
              value={sizes}
            />
          </label>
          <label htmlFor="category">
            <input
              className="field"
              name="category"
              type="text"
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
        <form className="ui form" onSubmit={handleSubmit}>
          <label htmlFor="price">
            <input
              className="field"
              name="price"
              type="text"
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
          <label htmlFor="category">
            <input
              className="field"
              name="category"
              type="text"
              placeholder="category"
              onChange={handleChange}
            />
          </label>
          <button>Add Item</button>
        </form>
      )
    }
  }
}

export default ProductForm
