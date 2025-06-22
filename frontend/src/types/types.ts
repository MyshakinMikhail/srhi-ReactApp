export interface FileState {
    file: File | null;
    status: "original" | "loading" | "success";
}

export interface ClearHistory {
    setHistory: React.Dispatch<React.SetStateAction<HistoryResult[]>>;
    setIsHistoryClear: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface deleteFile extends ClearHistory {
    fileId: number;
}

export type UseDownloadFileReturn = [
    deleteData: () => void,
    sendFile: () => void,
    downloadFile: (file: File) => void,
    status: StatusFile,
    error: string | null,
    fileName: string | null,
    result?: Result
];

export interface RequestHistoryState {
    history: RequestHistoryItem[];
    addToHistory: (item: Omit<RequestHistoryItem, "id">) => void;
    removeFromHistory: (id: string) => void;
    clearHistory: () => void;
}

export type RequestHistoryItem = {
    id?: string; // уникальный ID
    date?: string;
    fileName: string;
    status: "success" | "failed";
    result?: HistoryResult;
};

export type CivType = "humans" | "monsters" | "blobs";

export type StatusFile =
    | "original"
    | "loading"
    | "success"
    | "error"
    | "parsing"
    | "successLoading"
    | "successSend";

export interface HistoryResult extends Result {
    id: number;
    status: StatusFile;
    fileName: string | null;
    date: Date;
}

export interface Result {
    total_spend_galactic?: number;
    rows_affected?: number;
    less_spent_at?: number | string;
    big_spent_at?: number | string;
    less_spent_value?: number;
    big_spent_value?: number;
    average_spend_galactic?: number;
    big_spent_civ?: CivType;
    less_spent_civ?: CivType;
}

export type DescriptionKey =
    | "total_spend_galactic"
    | "rows_affected"
    | "less_spent_at"
    | "big_spent_at"
    | "big_spent_value"
    | "average_spend_galactic"
    | "big_spent_civ"
    | "less_spent_civ";
