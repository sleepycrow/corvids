import { ReactElement, useEffect } from 'react';
import { setPageTitle } from '../utils/ui';

export function Home(): ReactElement<{}>{
  useEffect(() => {
    setPageTitle(null)
  })

  return (
    <div className='page-container page-container--home'>
      <div className='page-placeholder-message'>
        <span className='material-icons'>
          visibility_off
        </span>
          
        <div>No distractions, what you need and nothing more.</div>
      </div>
    </div>
  )
}