import { ReactElement } from "react";

export function ErrorPlaceholder(props: { error: string }): ReactElement<{ error: string }> {
  return (
    <div className='page-placeholder-message'>
      <span className='material-icons'>
        error
      </span>
      
      <div>{ props.error }</div>
    </div>
  )
}