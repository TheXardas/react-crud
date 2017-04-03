import React from 'react';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom';
import ProfilesApp from './components/ProfilesApp';
import createContext from './stores/createContext';

const context = createContext();

const App = () => (
    <Provider {...context}>
        <ProfilesApp {...context} />
    </Provider>
);

if (window) {
    window.context = context;
}

ReactDOM.render(
    <App />,
    document.querySelector('.root')
);