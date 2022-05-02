import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPlaceholder } from "../components/ErrorPlaceholder";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { VideoItem } from "../components/VideoItem";
import { getChannel } from "../utils/api";
import { ChannelInformation } from "../utils/apiTypes";
import { setPageTitle, getBiggestThumbnail } from "../utils/ui";


export function Channel(): ReactElement<{}>{
  const params = useParams()

  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [channelInfo, setChannelInfo] = useState({} as ChannelInformation)

  useEffect(() => {
    setPageTitle((channelInfo.author || 'Loading'))
  }, [channelInfo])

  useEffect(() => {
    let newChannelId = params.channelId || ''
    if(newChannelId.length === 0)
      return

    // Update local data
    setIsLoaded(false)
    setError('')

    // Perform search
    getChannel(newChannelId)
      .then((res) => {
        setChannelInfo(res.json)
      })
      .catch((e) => {
        setError( typeof e === 'string' ? e : String(e) )
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [params])

  return (
    isLoaded
    ? renderChannelPage(channelInfo, error)
    : <LoadingPlaceholder />
  )
}


function renderChannelPage(channelInfo: ChannelInformation, error: string){
  if(error)
    return (
      <div className='page-container'>
        <ErrorPlaceholder error={error} />
      </div>
    )
  
  console.log(channelInfo)
  var descriptionHtml = channelInfo.descriptionHtml.replace(/\n/gi, "<br>")

  return (
    <div className='page-container page-container--channel'>
      <div className="channel-info">
        <img className="channel-info__banner" src={channelInfo.authorBanners.length > 0 ? channelInfo.authorBanners[0].url : ''} alt={channelInfo.author} />

        <div className="channel-info__profile">
          <img src={ getBiggestThumbnail(channelInfo.authorThumbnails).url } alt={channelInfo.author} />
          <h1>{channelInfo.author}</h1>
        </div>

        <div className="channel-info__description" dangerouslySetInnerHTML={{__html: descriptionHtml}}></div>
      </div>

      <div className='video-list video-list--big'>
        { channelInfo.latestVideos.map( (item: any) => <VideoItem key={item.videoId} video={item} /> ) }
      </div>
    </div>
  )
}