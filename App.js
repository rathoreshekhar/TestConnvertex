/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import { Root } from 'native-base';
import React, { Component } from 'react';
import { LogBox, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import Routes from './src/Routes';

//LogBox.ignoreAllLogs(true);
export default class App extends Component {
  render() {
    return (
      <Root>
        <StatusBar barStyle='dark-content' />
        <Routes />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Root>
    );
  }
}