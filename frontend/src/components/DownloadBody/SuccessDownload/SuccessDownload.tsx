import { ClearComponent } from "../../ClearComponent/ClearComponent";
import classes from "./SuccessDownload.module.css";

interface Props {
    onClick: () => void;
    fileName: string | null;
}

export const SuccessDownload = ({ fileName, onClick }: Props) => {
    return (
        <div className={classes.container}>
            <button className={classes.button}>{fileName}</button>
            <ClearComponent onClick={onClick} />
        </div>
    );
};
