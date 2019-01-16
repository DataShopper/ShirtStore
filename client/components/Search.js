import React from 'react'
import {connect} from 'react-redux'
import {searching} from '../store'
import {Link} from 'react-router-dom'

class Search extends React.Component {
  constructor() {
    super()

    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSelect(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.search(this.state)
    this.setState(this.state)
  }
  render() {
    const searched = this.props.searched
    return (
      <div>
        <h3>Search for your favorite items! One field at a time please!</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="color">
            <input
              name="color"
              placeholder="color: i.e. black"
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="sizes">
            <input
              name="sizes"
              placeholder="size: i.e. XL"
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="category">
            <input
              name="category"
              placeholder="category: i.e. men"
              onChange={this.handleSelect}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        <div className="ui three column doubling stackable centered padded grid row container">
          {searched.map(item => {
            return (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <div key={item.id} className="ui raised segment">
                    <img
                      src={item.imageUrl}
                      className="ui centered small image"
                    />
                    <p className="ui large header">{item.name}</p>
                    <p className="ui small header">{item.strPrice}</p>
                    <p className="ui small header">{item.description}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searched: state.searchResults,
    products: state.products
  }
}

const mapDispatchToProps = {
  search: searching
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
