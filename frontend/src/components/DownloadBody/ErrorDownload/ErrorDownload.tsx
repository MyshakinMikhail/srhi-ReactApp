import { ClearComponent } from "../../ClearComponent/ClearComponent";
import classes from "./ErrorDownload.module.css";

interface Props {
    onClick: () => void;
    fileName: string | null;
}

export const ErrorDownload = ({ onClick, fileName }: Props) => {
    return (
        <div className={classes.container}>
            <button className={classes.button}>{fileName}</button>
            <ClearComponent onClick={onClick} />
        </div>
    );
};
