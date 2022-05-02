import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ChannelResultItem } from "../utils/apiTypes";
import { getBiggestThumbnail } from "../utils/ui";


export function ChannelItem(props: {channel: ChannelResultItem}): ReactElement<{video: ChannelResultItem}> { 
  return (
    <Link className='video-item video-item--channel' to={'/channel/'+props.channel.authorId} title={props.channel.author}>
      <div className='video-item__thumbnail video-item__thumbnail--channel'>
        <img src={ getBiggestThumbnail(props.channel.authorThumbnails).url } alt={props.channel.author} />
      </div>
            
      <div className='video-item__info'>
        <div className='video-item__title'>
          {props.channel.author}
        </div>
        <div className='video-item__meta'>
          {props.channel.hasOwnProperty('subCount') && renderMetaItem('people', props.channel.subCount.toLocaleString())}
          {props.channel.hasOwnProperty('videoCount') && renderMetaItem('video_library', props.channel.videoCount.toLocaleString())}
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