import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigueStore } from './redux/ConfiguerStore';

const store = ConfigueStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}