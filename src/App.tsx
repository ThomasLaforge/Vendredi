import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import { Store } from './modules/Store'

import Game from './components/Game';
import CardSelectorTrainer from './components/CardSelectorTrainer';
import './styles/main.scss';

@observer
class App extends React.Component<{}, { store: Store} > {

  constructor(props: any){
    super(props);
    this.state = {
      store: new Store()
    }
  }

  render() {
    return (
      <Provider store={this.state.store} >
          <div className="App">
            <Game />
            {/* <CardSelectorTrainer /> */}
          </div>
      </Provider>
    );
  }
}

export default App;