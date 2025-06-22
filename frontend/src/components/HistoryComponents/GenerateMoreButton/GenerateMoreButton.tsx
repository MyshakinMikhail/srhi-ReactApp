import { useNavigate } from "react-router-dom";
import classes from "./GegerateMoreButton.module.css";

export const GegerateMoreButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className={classes.button}
            onClick={() => {
                navigate("/generate");
            }}
        >
            Сгенерировать больше
        </button>
    );
};
