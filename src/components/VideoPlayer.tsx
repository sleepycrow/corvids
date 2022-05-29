import { ReactElement } from "react";
import { VideoInformation } from "../utils/apiTypes";
import { getVideoThumbnail } from "../utils/ui";


export function VideoPlayer(props: {video: VideoInformation}): ReactElement<{video: VideoInformation}> { 
  var streams = props.video.formatStreams
  var best = streams[streams.length - 1]

  return(
    <video
      width="100%"
      src={best.url}
      poster={getVideoThumbnail(props.video.videoThumbnails, 'maxresdefault').url}
      controls
    />
  );
}