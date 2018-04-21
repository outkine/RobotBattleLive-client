import React from 'react'
import { render } from 'react-dom'
import { create } from 'jss'
import { JssProvider, ThemeProvider } from 'react-jss'
import preset from 'jss-preset-default'

import App from './App'
import { theme } from './css'

const jss = create(preset())

render(
  <JssProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </JssProvider>,
  document.getElementById('app'),
)
