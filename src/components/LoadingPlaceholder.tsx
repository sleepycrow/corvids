import { ReactElement } from "react";

export function LoadingPlaceholder(): ReactElement<{}> {
  return (
    <div className='page-placeholder-message'>
      <span className='material-icons'>
        hourglass_bottom
      </span>
      
      <div>Loading...</div>
    </div>
  )
}