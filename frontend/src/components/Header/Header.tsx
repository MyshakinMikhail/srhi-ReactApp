import classes from "./Header.module.css";
import { Generator } from "./pictures/Menu/Routers/Generator";
import { GeneratorCurr } from "./pictures/Menu/Routers/GeneratorCurr";
import { History } from "./pictures/Menu/Routers/History";
import { HistoryCurr } from "./pictures/Menu/Routers/HistoryCurr";
import { Uploader } from "./pictures/Menu/Routers/Uploader";
import { UploaderCurr } from "./pictures/Menu/Routers/UploaderCurr";
import { Tesis } from "./pictures/Menu/Tesis/Tesis";
import { SummerSchoolLogo } from "./pictures/SummerSchoolLogo";

export const Header = ({ important }: { important: string }) => {
    let uploader: boolean = false;
    let generator: boolean = false;
    let history: boolean = false;

    switch (important) {
        case "uploader":
            uploader = true;
            break;
        case "generator":
            generator = true;
            break;
        case "history":
            history = true;
            break;
    }
    return (
        <div className={classes.header}>
            <div className={classes.leftPart}>
                <SummerSchoolLogo />
                <Tesis />
            </div>
            <div className={classes.menu}>
                {uploader ? <UploaderCurr /> : <Uploader />}
                {generator ? <GeneratorCurr /> : <Generator />}
                {history ? <HistoryCurr /> : <History />}
            </div>
        </div>
    );
};
