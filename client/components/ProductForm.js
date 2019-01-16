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
      <div>
        <form className="ui-form" onSubmit={handleSubmit}>
          <label htmlFor="price">
            <Input
              id="price"
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
              id="name"
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
              id="color"
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
              id="desc"
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
              id="sizes"
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
              id="category"
              className="field"
              name="category"
              type="text"
              placeholder="category"
              onChange={handleChange}
              value={category}
            />
          </label>
          <Button id="add_item_button" className="ui centered">
            ADD ITEM
          </Button>
        </form>
      </div>
    )
  } else {
    const {handleChange, handleSubmit} = props
    return (
      <div
        style={{
          width: '500px',
          padding: '15px',
          marginTop: '17px',
          border: 'solid gray 1px'
        }}
        className="ui two column double stackable container"
      >
        <h3> Add a new Item to the Inventory</h3>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="two fields">
            <div className="field">
              <label htmlFor="price">
                <Input
                  id="price"
                  className="field"
                  name="price"
                  type="text"
                  placeholder="price"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label htmlFor="name">
                <Input
                  id="name"
                  className="field"
                  name="name"
                  type="text"
                  placeholder="name"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label htmlFor="color">
                <Input
                  id="color"
                  className="field"
                  name="color"
                  type="text"
                  placeholder="color"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label htmlFor="description">
                <Input
                  id="desc"
                  className="field"
                  name="description"
                  type="text"
                  placeholder="desc"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label htmlFor="sizes">
                <Input
                  id="size"
                  className="field"
                  name="sizes"
                  type="text"
                  placeholder="size"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label htmlFor="category">
                <Input
                  id="category"
                  className="field"
                  name="category"
                  type="text"
                  placeholder="category"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <Button id="add_item_btn" className="ui centered">
            ADD ITEM
          </Button>
        </form>
      </div>
    )
  }
}

export default ProductForm
