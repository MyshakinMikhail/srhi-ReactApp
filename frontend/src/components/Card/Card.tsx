import type { CivType, DescriptionKey } from "../../types/types";
import classes from "./Card.module.css";

const translator: Record<DescriptionKey, string> = {
    total_spend_galactic: "общие расходы в кредитах",
    rows_affected: "количество обработанных записей",
    less_spent_at: "день года с минимальными расходами",
    big_spent_at: "день года с максимальными расходами",
    big_spent_value: "максимальная сумма расходов за день",
    average_spend_galactic: "средние расходы в галактических кредитах",
    big_spent_civ: "цивилизация с максимальными расходами",
    less_spent_civ: "цивилизация с минимальными расходами",
};

export const Card = ({
    description,
    value,
    backgroundColor,
}: {
    description: DescriptionKey;
    value: number | CivType;
    backgroundColor: string;
}) => {
    return (
        <>
            {String(description) in translator && (
                <div
                    className={classes.container}
                    style={{
                        backgroundColor: backgroundColor,
                    }}
                >
                    <div className={classes.title}>{value}</div>
                    <div className={classes.description}>
                        {translator[description]}
                    </div>
                </div>
            )}
        </>
    );
};
