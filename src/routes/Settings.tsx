import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { defaultInstance } from '../utils/api';
import { setPageTitle } from '../utils/ui';

export function Settings(): ReactElement<{}>{
  var [instance, setInstance] = useState(window.localStorage.getItem('instance') || '')

  useEffect(() => {
    setPageTitle('Settings')
  })

  const handleInstanceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setInstance(e.target.value)
  }

  const saveSettings = (e: React.MouseEvent) => {
    e.preventDefault()

    if(instance.length > 0)
      window.localStorage.setItem('instance', instance)
    else
      window.localStorage.removeItem('instance')
  }

  return (
    <div className='page-container page-container--settings'>
      <h1 className="page-header">Settings</h1>

      <section>
        <h3>Instance</h3>
        <p>The URL of your preferred Invidious instance. Without a trailing slash, please and thank you. Probably don't touch if you don't know what you're doing.</p>
        <input type="text" id="instance" onChange={handleInstanceChange} value={instance} placeholder={defaultInstance} />
      </section>
      
      <button onClick={saveSettings}>Save</button>
    </div>
  )
}