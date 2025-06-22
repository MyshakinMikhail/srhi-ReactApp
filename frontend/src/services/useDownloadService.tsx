import { useEffect, useState } from "react";
import { useHistoryStore } from "../hooks/useHistoryStore";
import type { Result, StatusFile, UseDownloadFileReturn } from "../types/types";

export const useDownloadService = (): UseDownloadFileReturn => {
    const [status, setStatus] = useState<StatusFile>("original");
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [result, setResult] = useState<Result | undefined>(undefined);
    const [downloadedFile, setDownloadedFile] = useState<File | undefined>(
        undefined
    );
    const [isReadyToAdd, setIsReadyToAdd] = useState<boolean>(false);
    const { addToHistory } = useHistoryStore();

    function getFormattedDateFromDayOfYear(
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

    const translater = (object: Result): Result | undefined => {
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
            big_spent_at: getFormattedDateFromDayOfYear(
                object.big_spent_at,
                2025
            ),
            average_spend_galactic: Math.floor(object.average_spend_galactic),
            big_spent_value: Math.floor(object.big_spent_value),
        };

        return newObject;
    };

    const deleteData = () => {
        setStatus("original");
        setError(null);
        setFileName(null);
        setResult(undefined);
        setDownloadedFile(undefined);
        setIsReadyToAdd(false);
    };

    useEffect(() => {
        if (status === "successSend" || status === "error") {
            console.log(status, fileName, result);
            addToHistory(status, fileName, result);
        }
    }, [isReadyToAdd]);

    const sendFile = async () => {
        if (!downloadedFile) return;
        setResult(undefined);
        setStatus("parsing");
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", downloadedFile);

            const response = await fetch(
                "http://localhost:3000/aggregate?rows=1000",
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            let accumulatedResult: string = "";

            if (reader) {
                let done = false;
                while (!done) {
                    const { value, done: streamDone } = await reader.read();
                    done = streamDone;
                    if (value) {
                        const chunkText = decoder.decode(value);

                        accumulatedResult += chunkText;
                        // console.log(chunkText);
                        // Разбиваем по строкам
                        const lines = accumulatedResult.split(/\r?\n/);
                        const lastLine = lines.pop() || ""; // Последняя может быть незавершённой

                        // Обрабатываем каждую целую строку й
                        for (const line of lines) {
                            // console.log(line);
                            if (line.trim() === "") continue;
                            try {
                                // console.log(line);
                                const parsed = translater(JSON.parse(line)); // Парсим по одному объекту
                                // console.log(parsed);
                                if (
                                    JSON.stringify(result) !==
                                    JSON.stringify(parsed)
                                ) {
                                    setResult(parsed);
                                } // Сохраняем результат
                            } catch (e) {
                                console.error(
                                    "Ошибка парсинга строки ",
                                    line,
                                    e
                                );
                            }
                        }

                        // Сохраняем незавершённую часть для следующей итерации
                        accumulatedResult = lastLine;
                    }
                }

                // После окончания потока можно попробовать обработать остаток
                if (accumulatedResult.trim()) {
                    try {
                        const finalResult = JSON.parse(accumulatedResult);
                        setResult(finalResult);
                    } catch (e) {
                        console.error(
                            "Не удалось завершить парсинг последней части",
                            e
                        );
                    }
                }
            }
            // После окончания потока можно установить финальный статус
            setStatus("successSend");
        } catch (err) {
            setStatus("error");
            setError("Ошибка при загрузке файла");
            console.error(err);
        } finally {
            setIsReadyToAdd(true);
        }
    };

    const downloadFile = async (file: File) => {
        try {
            setDownloadedFile(file);
            setStatus("loading");
            setError(null);
            setFileName(file.name);

            if (!file.size) {
                setStatus("error");
                setError("Ошибка при загрузке файла");
            }
            setStatus("successLoading");
        } catch (err) {
            setStatus("error");
            setError("Ошибка при загрузке файла");
            console.error(err);
        }
    };

    return [
        deleteData,
        sendFile,
        downloadFile,
        status,
        error,
        fileName,
        result,
    ];
};
