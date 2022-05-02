import { AuthorThumbnail, VideoThumbnail } from "./apiTypes";

export const appName = "Corvids"

export function setPageTitle(title: string | null){
	if(typeof title !== 'string' || title.length === 0)
	title = ''

	document.title = (title.length > 0 ? title+' • ' : '')+appName
}

function padTimeUnit(time: number): string{
  return String(time).padStart(2, '0')
}

export function secondsToTime(totalSeconds: number): string{
  let totalMinutes = Math.floor(totalSeconds / 60)
  let totalHours = Math.floor(totalMinutes / 60)

  let seconds = totalSeconds % 60
  let minutes = totalMinutes % 60
  let hours = totalHours

  return (
    (hours > 0 ? padTimeUnit(hours)+':' : '') +
    padTimeUnit(minutes)+':'+
    padTimeUnit(seconds)
  )
}

export function getBiggestThumbnail(thumbs: Array<VideoThumbnail> | Array<AuthorThumbnail>): VideoThumbnail | AuthorThumbnail{
  var best = 0

  for(var i = 1; i < thumbs.length; i++){
    if(thumbs[i].width > thumbs[best].width)
      best = i
  }

  return thumbs[best]
}

export function getVideoThumbnail(thumbs: Array<VideoThumbnail>, quality: string): VideoThumbnail{
  for(var i = 0; i < thumbs.length; i++){
    if(quality === thumbs[i].quality)
      return thumbs[i]
  }

  return thumbs[0]
}