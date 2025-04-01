import { NavLink, Outlet } from 'react-router-dom';
import './Navigation.css';

interface INav {
    links: {
        path: string
        text: string
        id: string
    }[]
}

interface setActiveProps {
    isActive: boolean
}

const setActive = ({isActive}: setActiveProps) => isActive ? "link link-active" : "link";

export default function Navigation({links}: INav) {    
    return(
        <>
            <div className="navigation-container">
                <h2></h2>
                <nav className="nav">                
                    {links.map(link => {
                        return <NavLink 
                                    to={link.path}
                                    className={setActive}
                                    key={link.id}
                                >
                                    {link.text}
                                </NavLink>
                    })}
                </nav>                
            </div>
            <Outlet />
        </>
        
    )
}