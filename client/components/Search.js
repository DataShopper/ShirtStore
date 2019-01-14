import React from 'react'
import {connect} from 'react-redux'
import {searchAll} from '../store'

const Search = props => {
  return (
    <div>
      <label htmlFor="search">
        <input type="search" name="search" />
      </label>
      <button onClick={() => props.search()}>Search</button>
    </div>
  )
}

const mapDispatchToProps = {
  search: searchAll
}

export default connect(null, mapDispatchToProps)(Search)
