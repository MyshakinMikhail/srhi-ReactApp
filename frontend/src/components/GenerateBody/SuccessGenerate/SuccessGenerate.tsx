import { ClearComponent } from "./../../ClearComponent/ClearComponent";
import classes from "./SuccessGenerate.module.css";

export const SuccessGenerate = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <div className={classes.container}>
                <button className={classes.button}>Done!</button>
                <ClearComponent onClick={onClick} />
            </div>
            <div className={classes.text}>файл сгенерирован!</div>
        </>
    );
};
