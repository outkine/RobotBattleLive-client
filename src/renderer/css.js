export const global = {
  'html, body, #app': {
    height: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Nunito',
    userSelect: 'none',
  },
  'body *': {
    margin: 0,
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  'button, input': {
    border: 0,
  },
  'button:focus, input:focus': {
    outline: 0,
  },
  'p': {
    'cursor': 'default',
  },
  'img': {
    display: 'block',
  },
  'button img': {
    margin: 'auto',
  }
}

export const theme = {
  color: {
    background: '#EDEDED',
    foreground: '#C4C4C4',
    primary1: '#57A5E9',
    primary1Light: '#83C3FA',
    primary2: '#BE426C',
    primary2Light: '#FC739C',
    teamColors: ['#57A5E9', '#BE426C'],
  },
  // shadow: {
  //   action: '0 4px 20px rgba(0, 0, 0, 0.22)',
  //   ui: '0 4px 2px rgba(0, 0, 0, 0.12)',
  //   inset: 'inset 0 0 4px 2px rgba(0, 0, 0, 0.12)',
  //   s1: '0 0 4px 3px rgba(0, 0, 0, 0.12)',
  // },
  border: {
    standard: {
      border: '8px solid black',
      borderRadius: 10,
    },
  },
}
