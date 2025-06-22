import { ClearComponent } from "../../ClearComponent/ClearComponent";
import classes from "./ErrorGenerate.module.css";

interface Props {
    onClick: () => void;
}

export const ErrorGenerate = ({ onClick }: Props) => {
    return (
        <>
            <div className={classes.container}>
                <button className={classes.button}>Ошибка</button>
                <ClearComponent onClick={onClick} />
            </div>
            <div className={classes.text}>упс, не то...</div>
        </>
    );
};
