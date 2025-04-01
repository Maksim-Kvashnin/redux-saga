import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function ListAndDetails() {
    return(
        <Provider store={store}>
            <Outlet />
        </Provider>          
    )
}