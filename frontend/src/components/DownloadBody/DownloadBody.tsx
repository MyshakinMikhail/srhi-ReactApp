import { useDownloadService } from "../../services/useDownloadService";
import { Loader } from "../GenerateBody/Loader/Loader";
import classes from "./DownloadBody.module.css";
import { DownloadFooter } from "./DownloadFooter/DownloadFooter";
import { DragDropArea } from "./DragDropArea/DragDropArea";
import { ErrorDownload } from "./ErrorDownload/ErrorDownload";
import { Highlights } from "./Highlights/Highlights";
import { SendButton } from "./SendButton/SendButton";
import { SuccessDownload } from "./SuccessDownload/SuccessDownload";

export const DownloadBody = () => {
    const [
        deleteData,
        sendFile,
        downloadFile,
        status,
        error,
        fileName,
        result,
    ] = useDownloadService();

    return (
        <>
            <div className={classes.container}>
                <div className={classes.title}>
                    Загрузите <strong>csv</strong> файл и
                    <strong> получите полную</strong> информацию о нём за
                    сверхнизкое время
                </div>

                {!error && status === "original" && (
                    <>
                        <DragDropArea onFileSelect={downloadFile} />
                        <SendButton />
                    </>
                )}
                {!error && (status === "loading" || status === "parsing") && (
                    <>
                        <div className={classes.body}>
                            <Loader />
                            <div className={classes.text}>
                                {status === "loading"
                                    ? "идет загрузка..."
                                    : "идет парсинг..."}
                            </div>
                        </div>
                        <SendButton />
                    </>
                )}
                {!error &&
                    (status === "successLoading" ||
                        status === "successSend") && (
                        <>
                            <div
                                className={`${classes.body} ${classes.success}`}
                            >
                                <SuccessDownload
                                    fileName={fileName}
                                    onClick={deleteData}
                                />
                                <div className={classes.text}>
                                    {status === "successLoading"
                                        ? "файл загружен!"
                                        : "готово!"}
                                </div>
                            </div>
                            {status !== "successSend" && (
                                <SendButton active={true} sendFile={sendFile} />
                            )}
                        </>
                    )}
                {error && (
                    <>
                        <div className={`${classes.body} ${classes.error}`}>
                            <ErrorDownload
                                onClick={deleteData}
                                fileName={fileName}
                            />
                            <div className={classes.errorText}>
                                упс, не то...
                            </div>
                        </div>
                    </>
                )}
            </div>
            {status !== "successSend" && status !== "parsing" && (
                <DownloadFooter />
            )}
            {!error &&
                (status === "parsing" || status === "successSend") &&
                result !== null && (
                    <Highlights highlights={result} backgroundColor="white" />
                )}
        </>
    );
};
