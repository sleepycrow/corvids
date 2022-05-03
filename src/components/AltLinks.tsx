import { ReactElement } from "react"

export function AltLinks(): ReactElement<{}>{
  return (
    <div className="info__links">
      <a href={hereButDifferentHost('https://youtube.com')} target="_blank">YouTube</a>
      <a href={hereButDifferentHost('https://invidio.us')} target="_blank">Invidious</a>
      <a href={hereButDifferentHost('https://piped.kavin.rocks')} target="_blank">Piped</a>
      <a href={hereButDifferentHost('https://tube.cadence.moe')} target="_blank">Cloudtube</a>
    </div>
  )
}


function hereButDifferentHost(newHost: string): string{
  return newHost + window.location.pathname + window.location.search
}