import './test'

if (module.hot) {
  module.hot.accept('./test', () => {
    console.log('it works!')
  })
}


import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Container from './js/containers/container'
import './css/styles.less'

ReactDom.render(
  <AppContainer>
    <Container/>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./js/containers/root', () => {
    ReactDom.render(
      <AppContainer>
        <Container/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
