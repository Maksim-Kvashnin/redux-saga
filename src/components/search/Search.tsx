import store from './redux/store';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import SkillList from './SkillList';

export default function Search() {
    return(
        <Provider store={store}>
            <SearchBar />
            <SkillList />
        </Provider>
    )
}