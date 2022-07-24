import './bootstrap';

import { App } from './components/App';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { Fragment } from 'react';
import { BackgroundColor, Color } from './variables/Color';

const app = document.getElementById('app');
const root = createRoot(app);

const GlobalStyle = createGlobalStyle`
    body {
        color: ${Color.body};
        background-color: ${BackgroundColor.body};
        margin: 0;
    }
`

root.render(
    <Fragment>
        <GlobalStyle />
        <App />
    </Fragment>
);
