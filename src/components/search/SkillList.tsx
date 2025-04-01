import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import type { skill } from "./redux/skillsSlice";
import Loder from "../../UI/Loder";

export default function SkillList() {
    const { list, load } = useSelector((state: RootState) => state.skills);
    return(
        <>
            {load && 
                <div><Loder /></div>            
            }            
            {!load &&
                list.map((skill: skill) => {
                    return <div key={skill.id}>{skill.name}</div>
                })
            }
        </>
    )
}