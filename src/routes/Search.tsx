import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChannelItem } from "../components/ChannelItem";
import { ErrorPlaceholder } from "../components/ErrorPlaceholder";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { VideoItem } from "../components/VideoItem";
import { search } from "../utils/api";
import { ResultItem } from '../utils/apiTypes';
import { setPageTitle } from "../utils/ui";


export function Search(): ReactElement<{}>{
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [results, setResults] = useState([] as Array<ResultItem>)

  useEffect(() => {
    setPageTitle(query)
  }, [query])

  useEffect(() => {
    let newQuery = searchParams.get('search_query') || ''
    if(newQuery.length === 0)
      return

    // Update local data
    setQuery(newQuery)
    setIsLoaded(false)
    setError('')

    // Perform search
    search(newQuery)
      .then((res) => {
        setResults(res.json)
      })
      .catch((e) => {
        setError( typeof e === 'string' ? e : String(e) )
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [searchParams])

  return (
    isLoaded
    ? renderSearchResults(query, results, error)
    : <div className="page-container"><LoadingPlaceholder /></div>
  );
}


function renderSearchResults(query: string, results: Array<any>, error: string){
  if(error)
    return (<ErrorPlaceholder error={error} />)
  
  console.log(results)
  return (
    <div className='page-container page-container--search'>
      <h1 className='page-header'>Search results for "{query}"</h1>
      <div className='video-list video-list--big'>
        { results.map(renderResultItem) }
      </div>
    </div>
  )
}


function renderResultItem(item: ResultItem){
  // TODO: ADD SUPPORT FOR OTHER KINDS OF ITEMS
  switch(item.type){
    case 'video':
      return (<VideoItem key={item.videoId} video={item} />)
    
    case 'channel':
      return (<ChannelItem key={item.authorId} channel={item} />)
    
    default:
      return (<p>{item.type}</p>)
  }
}