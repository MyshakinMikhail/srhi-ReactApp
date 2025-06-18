import classes from "./DownloadButton/Download.module.css";
import { DownloadButton } from "./DownloadButton/DownloadButton";
import { SendButton } from "./SendButton/SendButtonBlur";

export const DownloadBody = () => {
    return (
        <>
            <div className={classes.title}>
                Загрузите <strong>csv</strong> файл и
                <strong> получите полную</strong> информацию о нём за
                сверхнизкое время
            </div>
            <div className={classes.body}>
                <DownloadButton />
                <div className={classes.text}>или перетащите сюда</div>
            </div>
            <SendButton className={classes.button} />
            <div className={classes.highlights}>Здесь </div>
            <div className={classes.highlights}> появятся хайлайты</div>
        </>
    );
};
