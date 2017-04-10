import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './redux/configureStore'
import Canvas from './containers/CanvasContainer';
import LayerList from './containers/LayerListContainer'
import ColorPicker from './containers/ColorPickerContainer'
import './App.css';

import { REDO, UNDO } from './redux/reducer-enhancers/undoable'

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
        <div className="App" style={{ display: 'flex', backgroundColor: '#121212', height: '100vh', width: '100vw' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 200px)' }}>
            <Canvas
              width={16}
              height={16}
              scale={32}
              pixels={[]}
              style={{ backgroundColor: 'white', cursor: 'crosshair', userSelect: 'none' }}
            />
          </div>
          <LayerList />
          <ColorPicker />
        </div>
      </Provider>
    );
  }
}

export default App;
