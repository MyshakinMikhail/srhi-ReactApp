import { Generator } from "../pictures/Menu/Generator";
import { Uploader } from "../pictures/Menu/Uploader";
import { SummerSchoolLogo } from "../pictures/SummerSchoolLogo";
import { History } from "./../pictures/Menu/History";
import { Tesis } from "./../pictures/Menu/Tesis/Tesis";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.leftPart}>
                <SummerSchoolLogo />
                <Tesis />
            </div>
            <div className={classes.menu}>
                <Uploader />
                <Generator />
                <History />
            </div>
        </div>
    );
};
