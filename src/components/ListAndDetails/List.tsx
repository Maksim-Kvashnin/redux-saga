/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { listItem } from "./redux/ListAndDetailsSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import Loder from "../../UI/Loder";
import { getList, getItem } from "./redux/ListAndDetailsSlice";
import style from "./styles/list.module.scss";

export default function List() {
  const { load, list, error } = useSelector((store: RootState) => store.LAD);
  const dispatch = useDispatch();

  useEffect(() => {
    list.length === 0 && dispatch(getList());
  }, [dispatch, list.length]);

  const handleRetry = () => {
    dispatch(getList());
  };

  return (
    <>
      <div>Список:</div>
      <div className={style.container}>
        {load && <Loder />}
        {!load &&
          list.map((el: listItem) => {
            return (
              <Link
                className={style.link}
                to={`/list-and-details/:${el.id}/details`}
                key={el.id}
                onClick={() => {
                  dispatch(getItem(String(el.id)));
                }}
              >
                {el.name}: {el.price}
              </Link>
            );
          })}
        {!load && error && (
          <div>
            <div style={{ color: "red" }}>{error}</div>
            <button className="retry" onClick={handleRetry}>
              Повторить запрос
            </button>
          </div>
        )}
      </div>
    </>
  );
}