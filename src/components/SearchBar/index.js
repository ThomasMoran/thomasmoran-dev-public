import { Index } from 'elasticlunr'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'throttle-debounce'

import Icon from '../Icon'
import './style.css'

const SearchBar = ({ searchIndex, setPosts, docType = 'blog' }) => {
  const [query, setQuery] = useState('')
  let index

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [])

  // Create an elastic lunr index and hydrate with graphql query results (Index.load)
  const getOrCreateIndex = () => (index ? index : Index.load(searchIndex))

  const search = e => {
    const input = e.target.value
    index = getOrCreateIndex()

    const res = index
      .search(input, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref))
      // Filter out snippet results
      .filter(doc => doc.type === docType)
    setQuery(input)
    setPosts(input, res)
  }

  const debouncedSearch = useMemo(() => debounce(300, false, search), [query])

  return (
    <>
      <div className="search">
        <input
          type="search"
          name="search"
          placeholder="Search all my posts"
          aria-label="Search blog posts"
          autoComplete="off"
          required
          onChange={debouncedSearch}
        />
        <Icon customClass="search__icon" name="Search" size="small" />
      </div>
    </>
  )
}

export default SearchBar
