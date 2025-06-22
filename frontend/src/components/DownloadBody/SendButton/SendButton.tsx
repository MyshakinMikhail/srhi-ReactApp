import classes from "./SendButton.module.css";

interface Props {
    active?: boolean;
    sendFile?: () => void;
}

export const SendButton = ({ active = false, sendFile }: Props) => {
    return (
        <>
            <button
                className={`${classes.button} ${
                    active ? classes.active : null
                }`}
                onClick={() => {
                    if (sendFile) {
                        sendFile();
                    }
                }}
            >
                <strong>Отправить</strong>
            </button>
        </>
    );
};
