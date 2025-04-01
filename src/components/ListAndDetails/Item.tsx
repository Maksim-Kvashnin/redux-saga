import type { RootState } from './redux/store';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import Loder from '../../UI/Loder';
import style from './styles/list.module.scss';

export default function Item() {
    const { item, error, load } = useSelector((store: RootState) => store.LAD);
    return(
        <>
            <div className={style.container}>  
                { load && <Loder /> }
                { !load &&
                    <>
                        <div>{item?.name}</div>
                        <div>Цена: {item?.price}</div>
                        <div>{item?.content}</div>
                        <Link to={'/list-and-details'}>Назад</Link>
                    </>                    
                }
                { !load && error &&
                    <div>{error}</div>
                }
            </div>
        </>
    )
}