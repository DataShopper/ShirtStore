import React from 'react'
import {Input, Button} from 'semantic-ui-react'

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
      <div className="ui two column doubling stackable centered padded grid row container">
        <form className="ui-form" onSubmit={handleSubmit}>
          <label htmlFor="price">
            <Input
              className="field"
              name="price"
              type="text"
              placeholder="price"
              onChange={handleChange}
              value={price}
            />
          </label>
          <label htmlFor="name">
            <Input
              className="field"
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
              value={name}
            />
          </label>
          <label htmlFor="color">
            <Input
              className="field"
              name="color"
              type="text"
              placeholder="color"
              onChange={handleChange}
              value={color}
            />
          </label>
          <label htmlFor="description">
            <Input
              className="field"
              name="description"
              type="text"
              placeholder="desc"
              onChange={handleChange}
              value={description}
            />
          </label>
          <label htmlFor="sizes">
            <Input
              className="field"
              name="sizes"
              type="text"
              placeholder="size"
              onChange={handleChange}
              value={sizes}
            />
          </label>
          <label htmlFor="category">
            <Input
              className="field"
              name="category"
              type="text"
              placeholder="category"
              onChange={handleChange}
              value={category}
            />
          </label>
          <Button className="ui centered">ADD ITEM</Button>
        </form>
      </div>
    )
  } else {
    const {handleChange, handleSubmit} = props
    return (
      <div className="ui two column double stackable container">
        <form className="ui form" onSubmit={handleSubmit}>
          <label htmlFor="price">
            <Input
              className="field"
              name="price"
              type="text"
              placeholder="price"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            <Input
              className="field"
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="color">
            <Input
              className="field"
              name="color"
              type="text"
              placeholder="color"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <Input
              className="field"
              name="description"
              type="text"
              placeholder="desc"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="sizes">
            <Input
              className="field"
              name="sizes"
              type="text"
              placeholder="size"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category">
            <Input
              className="field"
              name="category"
              type="text"
              placeholder="category"
              onChange={handleChange}
            />
          </label>
          <Button className="ui centered">ADD ITEM</Button>
        </form>
      </div>
    )
  }
}

export default ProductForm
