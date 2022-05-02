import { ReactElement } from "react";
import { VideoInformation } from "../utils/apiTypes";


export function VideoPlayer(props: {video: VideoInformation}): ReactElement<{video: VideoInformation}> { 
  var streams = props.video.formatStreams
  var best = streams[streams.length - 1]

  return(
    <video width="100%" src={best.url} controls />
  );
}