export const global = {
  'html, body, #app': {
    height: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'body *': {
    margin: 0,
  },
  '*, *: before, *: after': {
    boxSizing: 'inherit',
  },
  'button': {
    border: 0,
  },
  'button:focus': {
    outline: 0,
  }
}

export const theme = {
  color: {
    background: 'white',
    foreground: '#57A5E9',
    foregroundDark: '#4284BD',
    foregroundLight: '#83C3FA',
    action: '#C4E4FF',
  },
  shadow: {
    action: '0 4px 20px rgba(0, 0, 0, 0.22)',
    ui: '0 4px 2px rgba(0, 0, 0, 0.12)',
    inset: 'inset 0 0 4px 2px rgba(0, 0, 0, 0.12)',
    s1: '0 0 4px 3px rgba(0, 0, 0, 0.12)',
  }
}
