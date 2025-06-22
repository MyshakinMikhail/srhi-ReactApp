import classes from "./ClearHistoryButton.module.css";

export const ClearHistoryButton = ({
    clearHistory,
}: {
    clearHistory: () => void;
}) => {
    return (
        <button className={classes.button} onClick={clearHistory}>
            Очистить все
        </button>
    );
};
