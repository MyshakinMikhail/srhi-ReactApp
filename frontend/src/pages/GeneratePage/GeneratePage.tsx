import { GenerateButton } from "../../components/GenerateBody/GenerateButton/GenerateButton";
import { Header } from "../../components/Header/Header";
import classes from "./GeneratePage.module.css";

export const GeneratePage = () => {
    return (
        <>
            <div className={classes.container}>
                <Header important="generator" />
                <div className={classes.title}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </div>
                <GenerateButton />
            </div>
        </>
    );
};
