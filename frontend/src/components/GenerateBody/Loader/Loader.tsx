import classes from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}></div>
        </div>
    );
};
