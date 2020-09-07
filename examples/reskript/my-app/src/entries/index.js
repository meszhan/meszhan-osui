import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import '@osui/theme/dist/theme/vars.css';
import '@osui/theme/dist/antd4-styles-patch.css';
import App from '@/components/App';
import {store} from '@/store';
import '@/styles';

const main = () => render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

main();
