import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './redux/configureStore'
import Canvas from './containers/CanvasContainer';
import LayerList from './containers/LayerListContainer'
import ColorPicker from './containers/ColorPickerContainer'
import Sequencer from './containers/Sequencer'
import Toolbar from './containers/Toolbar'
import styled from 'styled-components'
import './App.css';

import { REDO, UNDO } from './redux/reducer-enhancers/undoable'

const Header = styled.header`
  padding: 16px;
  background-color: #1c1a22;
  border: 1px solid #979797;
`

class App extends Component {
  componentDidMount () {
    window.document.addEventListener('keyup', function (e) {
      switch (e.keyCode) {
        case 90:
          e.ctrlKey && !e.shiftKey && store.dispatch({ type: UNDO })
          e.ctrlKey && e.shiftKey && store.dispatch({ type: REDO })
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#121212', height: '100vh', width: '100vw' }}>
          <Header>
            <Toolbar />
          </Header>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 300px)', backgroundColor: '#2a2733' }}>
              <Canvas style={{ backgroundColor: 'white', cursor: 'crosshair', userSelect: 'none' }}
              />
            </div>
          <LayerList />
          </div>
          <Sequencer />
        </div>
      </Provider>
    );
  }
}

export default App;
