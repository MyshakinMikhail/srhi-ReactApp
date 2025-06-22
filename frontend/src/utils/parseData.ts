import type { Result } from "../types/types";

export function getFormattedDateFromDayOfYear(
    dayOfYear: number,
    year: number = new Date().getFullYear()
): string {
    const date = new Date(year, 0, 1);
    date.setDate(date.getDate() + dayOfYear - 1);

    const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
    };

    return date.toLocaleDateString("ru-RU", options);
}

export const translater = (object: Result): Result | undefined => {
    if (
        object.less_spent_at === undefined ||
        object.big_spent_at === undefined ||
        object.average_spend_galactic === undefined ||
        object.big_spent_value === undefined
    ) {
        console.error("Не все поля доступны в result");
        return;
    }
    if (
        typeof object.less_spent_at !== "number" ||
        typeof object.big_spent_at !== "number" ||
        typeof object.average_spend_galactic !== "number" ||
        typeof object.big_spent_value !== "number"
    ) {
        console.error("Не все поля — числа");
        return;
    }

    const newObject: Result = {
        ...object,
        less_spent_at: getFormattedDateFromDayOfYear(
            object.less_spent_at,
            2025
        ),
        big_spent_at: getFormattedDateFromDayOfYear(object.big_spent_at, 2025),
        average_spend_galactic: Math.floor(object.average_spend_galactic),
        big_spent_value: Math.floor(object.big_spent_value),
    };

    return newObject;
};
