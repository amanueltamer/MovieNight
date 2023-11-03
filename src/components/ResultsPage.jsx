import React from 'react'
import "../css/ResultsPage.css"
import Header from './Header'
import SearchResults from './SearchResults'

export default function ResultsPage() {
  return (
    <div className='results__page'>
        <Header />
        <SearchResults />
    </div>
  )
}
