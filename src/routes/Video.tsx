import { ReactElement, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ErrorPlaceholder } from "../components/ErrorPlaceholder";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { VideoItem } from "../components/VideoItem";
import { VideoPlayer } from "../components/VideoPlayer";
import { getVideo } from "../utils/api";
import { VideoInformation } from "../utils/apiTypes";
import { setPageTitle } from "../utils/ui";


export function Video(): ReactElement<{}>{
  const [searchParams] = useSearchParams()

  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoInfo, setVideoInfo] = useState({} as VideoInformation)

  useEffect(() => {
    setPageTitle((videoInfo.title || 'Loading'))
  }, [videoInfo])

  useEffect(() => {
    let newVideoId = searchParams.get('v') || ''
    if(newVideoId.length === 0)
      return

    // Update local data
    setIsLoaded(false)
    setError('')

    // Perform search
    getVideo(newVideoId)
      .then((res) => {
        setVideoInfo(res.json)
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
    ? renderVideoPage(videoInfo, error)
    : <LoadingPlaceholder />
  )
}


function renderVideoPage(videoInfo: VideoInformation, error: string){
  if(error)
    return (
      <div className='page-container'>
        <ErrorPlaceholder error={error} />
      </div>
    )
  
  console.log(videoInfo)
  var descriptionHtml = videoInfo.descriptionHtml.replace(/\n/gi, "<br>")
  
  return (
    <div className='page-container page-container--video'>
      <main className='video'>
        <section className="video__player">
          <VideoPlayer video={videoInfo} />
        </section>

        <section className="video__info">
          <h1 className="info__title">{videoInfo.title}</h1>

          <div className="info__meta">
            <span>
              <span className="material-icons md-24">event</span> {videoInfo.publishedText}
            </span>

            <span>
              <span className="material-icons md-24">visibility</span> {videoInfo.viewCount.toLocaleString()}
            </span>
          </div>

          <div className="info__description" dangerouslySetInnerHTML={{__html: descriptionHtml}}></div>

          <div className="info__links">
            <a href={"https://youtube.com/watch?v="+videoInfo.videoId} target="_blank">YouTube</a>
            <a href={"https://invidio.us/watch?v="+videoInfo.videoId} target="_blank">Invidious</a>
            <a href={"https://piped.kavin.rocks/watch?v="+videoInfo.videoId} target="_blank">Piped</a>
            <a href={"https://tube.cadence.moe/watch?v="+videoInfo.videoId} target="_blank">Cloudtube</a>
          </div>
        </section>

        <section className="video__author">
          <div className="author__profile">
            <Link to={"/channel/"+videoInfo.authorId} title={videoInfo.author}>
              <img src={videoInfo.authorThumbnails[0].url} alt={videoInfo.author} />
              <strong>{videoInfo.author}</strong>
            </Link>
          </div>
        </section>
      </main>

      <aside className="related-container">
        <div className="video-list">
          { videoInfo.recommendedVideos.map( (item: any) => <VideoItem key={item.videoId} video={item} /> ) }
        </div>
      </aside>
    </div>
  )
}