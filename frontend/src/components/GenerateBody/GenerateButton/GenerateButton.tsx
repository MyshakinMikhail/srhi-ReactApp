import classes from "./GenerateButton.module.css";

export const GenerateButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            Начать генерацию
        </button>
    );
};
