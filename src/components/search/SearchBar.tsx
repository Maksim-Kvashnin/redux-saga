import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "./redux/skillsSlice";
import type { AppDispatch, RootState } from "./redux/store";
import style from "./styles/SearchBar.module.scss";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, query, error, load } = useSelector(
    (state: RootState) => state.skills
  );

  const isNoQuery = () =>
    list.length === 0 && !error && (!query || query.length === 0) && !load;
  const isNoResult = () =>
    list.length === 0 && !error && query && query.length > 0 && !load;
  const isError = () => error && !load;

  return (
    <>
      <input
        className={style.searchBar}
        type="text"
        value={query}
        onChange={(e) => {
          dispatch(changeSearchField(e.target.value));
        }}
      />
      {isNoQuery() && <div>Type something to search...</div>}
      {isNoResult() && <div>No results</div>}
      {isError() && (
        <div style={{ color: "red" }}>Sorry :( {error as string}</div>
      )}
    </>
  );
}