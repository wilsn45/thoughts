// * Description: App Entry Point
import React, {Component} from 'react';

import AppRouter from './app/routes/AppRouter'

export default class App extends Component {
    render() {
        return <AppRouter/>;
    }
}