import { useState } from "react";

export const GenerateService = () => {
    const [generateState, setGenerateState] = useState("original");
    const [error, setError] = useState("");

    const generateFile = async () => {
        setGenerateState("loading");

        const paramsObj = {
            size: "0.001",
            withErrors: "on",
            maxSpend: "5000",
        };

        const params = new URLSearchParams(
            Object.entries(paramsObj) as [string, string][]
        );

        const url = `http://localhost:3000/report?${params}`;

        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка от сервера: ${errorText}`);
            }

            if (!response.body) {
                throw new Error("Тело ответа пустое");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let receivedText = "";
            const blobParts: ArrayBuffer[] = [];

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                receivedText += decoder.decode(value, { stream: true });
                blobParts.push(value.buffer);

                if (receivedText.length > 0 && receivedText.length < 500) {
                    console.log("Первые данные:", receivedText.slice(0, 500));
                }
            }

            const blob = new Blob(blobParts, { type: "text/csv" });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.href = downloadUrl;
            a.download = "data.csv";
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(downloadUrl);
            setGenerateState("success");
        } catch (error) {
            setError("Ошибка при генерации файла: " + error);
        }
    };

    return { generateFile, generateState, setGenerateState, error, setError };
};
