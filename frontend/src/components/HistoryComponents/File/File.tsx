import type { StatusFile } from "../../../types/types";
import { FileIcon } from "../Icons/FileIcon/FileIcon";
import { FunnySmile } from "../Icons/FunnySmile/FunnySmile";
import { SadIcon } from "../Icons/SadIcon/SadIcon";
import classes from "./File.module.css";

interface Props {
    status: StatusFile;
    fileName: string | null;
    date: Date;
    onClick: () => void;
}

export const File = ({ status, fileName, date, onClick }: Props) => {
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-4);

        return `${day}.${month}.${year}`;
    };

    return (
        <>
            <div className={classes.container} onClick={onClick}>
                <div className={classes.group}>
                    <FileIcon />
                    {fileName}
                </div>
                <div>{date && formatDate(date.toString())}</div>
                {status === "successSend" && (
                    <>
                        <div className={classes.group}>
                            Обработан успешно
                            <FunnySmile active={true} />
                        </div>
                        <div className={`${classes.group} ${classes.active}`}>
                            Не удалось обработать
                            <SadIcon />
                        </div>
                    </>
                )}
                {status === "error" && (
                    <>
                        <div className={`${classes.group} ${classes.active}`}>
                            Обработан успешно
                            <FunnySmile />
                        </div>
                        <div className={classes.group}>
                            Обработан не успешно
                            <SadIcon active={true} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
