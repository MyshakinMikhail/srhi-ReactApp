import { ErrorGenerate } from "../../components/GenerateBody/ErrorGenerate/ErrorGenerate";
import { GenerateButton } from "../../components/GenerateBody/GenerateButton/GenerateButton";
import { Loader } from "../../components/GenerateBody/Loader/Loader";
import { SuccessGenerate } from "../../components/GenerateBody/SuccessGenerate/SuccessGenerate";
import { Header } from "../../components/Header/Header";
import { useGenerateService } from "../../hooks/useGenerateService";
import classes from "./GeneratePage.module.css";

export const GeneratePage = () => {
    const { generateFile, generateState, setGenerateState, error, setError } =
        useGenerateService();

    const handleClear = () => {
        setGenerateState("original");
        setError("");
    };

    return (
        <>
            <div className={classes.container}>
                <Header important="generator" />
                <div className={classes.title}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </div>

                {!error && generateState === "original" && (
                    <GenerateButton onClick={generateFile} />
                )}
                {!error && generateState === "loading" && (
                    <>
                        <Loader />
                        <div className={classes.title}>
                            идет процесс генерации
                        </div>
                    </>
                )}
                {!error && generateState === "success" && (
                    <SuccessGenerate onClick={handleClear} />
                )}
                {error && <ErrorGenerate onClick={handleClear} />}
            </div>
        </>
    );
};
