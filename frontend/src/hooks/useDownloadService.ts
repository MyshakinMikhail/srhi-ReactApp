import { useEffect, useState } from "react";
import { useHistoryStore } from "../store/useHistoryStore";
import type { Result, StatusFile, UseDownloadFileReturn } from "../types/types";
import { translater } from "../utils/parseData";

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
