import { useMemo } from "react";
import type { DescriptionKey, Result } from "../../../types/types";
import { Card } from "../../Card/Card";
import classes from "./Highlights.module.css";

const defaultResult: Result = {
    total_spend_galactic: 0,
    rows_affected: 0,
    less_spent_at: 0,
    big_spent_at: 0,
    less_spent_value: 0,
    big_spent_value: 0,
    average_spend_galactic: 0,
    big_spent_civ: "humans",
    less_spent_civ: "humans",
};

export const Highlights = ({
    highlights,
    backgroundColor = "white",
}: {
    highlights?: Result;
    backgroundColor: string;
}) => {
    const memoHighlights = useMemo(
        () => highlights || defaultResult,
        [highlights]
    );

    return (
        <div className={classes.container}>
            {Object.entries(memoHighlights).map(([description, value]) => (
                <Card
                    key={description}
                    description={description as DescriptionKey}
                    value={value}
                    backgroundColor={backgroundColor}
                />
            ))}
        </div>
    );
};
