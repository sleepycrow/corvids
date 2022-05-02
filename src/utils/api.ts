import * as Type from './apiTypes'


// The URL of an Invidious instance with a public API, without a trailing slash.
export const defaultInstance = ''


export function getBaseUrl(){
	return (window.localStorage.getItem('instance') || defaultInstance) + '/api/v1'
}


async function fetchApi(endpoint: RequestInfo, init?: RequestInit): Promise<{ resp: Response, json: any }>{
  try{
    var resp = await fetch(getBaseUrl()+endpoint, init)
    if(!resp.ok)
      throw new Error("[API] "+resp.statusText)

    var json = await resp.json()
    return {resp: resp, json: json}
  }catch(e){
    throw e
  }
}


export function search(query: string): Promise<{ resp: Response, json: Array<Type.ResultItem>}>{
  return fetchApi('/search?q='+query)
}


export function getVideo(id: string): Promise<{ resp: Response, json: Type.VideoInformation}>{
  return fetchApi('/videos/'+id)
}


export function getChannel(id: string): Promise<{ resp: Response, json: Type.ChannelInformation}>{
  return fetchApi('/channels/'+id)
}