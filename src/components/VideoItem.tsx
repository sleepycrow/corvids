import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { VideoResultItem } from "../utils/apiTypes";
import { getVideoThumbnail, secondsToTime } from "../utils/ui";


export function VideoItem(props: {video: VideoResultItem}): ReactElement<{video: VideoResultItem}> { 
  return (
    <Link className='video-item' to={'/watch?v='+props.video.videoId} title={props.video.title}>
      <div className='video-item__thumbnail'>
        <img src={ getVideoThumbnail(props.video.videoThumbnails, 'sddefault').url } alt={props.video.title} />
        <span className='video-item__duration'>{secondsToTime(props.video.lengthSeconds)}</span>
      </div>
            
      <div className='video-item__info'>
        <div className='video-item__title'>
          {props.video.title}
        </div>
        <div className='video-item__meta'>
          {props.video.hasOwnProperty('author') && renderMetaItem('account_circle', props.video.author)}
          {props.video.hasOwnProperty('viewCount') && renderMetaItem('visibility', props.video.viewCount.toLocaleString())}
          {props.video.hasOwnProperty('publishedText') && renderMetaItem('event', props.video.publishedText)}
        </div>
      </div>
    </Link>
  )
}


function renderMetaItem(icon: string, value: string | number){
  return (
    <span>
      <span className='material-icons md-18'>{icon}</span> {value}
    </span>
  )
}