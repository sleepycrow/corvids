import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeaderSearch(): ReactElement<{}> {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    navigate('/results?search_query='+encodeURIComponent(query))
  }

  return (
    <form action="/results" method="GET" onSubmit={handleSubmit}>
      <input
        name="search_query"
        type="text"
        placeholder="Seek, find."
        value={query}
        onChange={handleChange}
      />

      <button>
        Search
      </button>
    </form>
  )
}