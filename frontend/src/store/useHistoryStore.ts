import { create } from "zustand";
import type {
    HistoryResult,
    HistoryStore,
    Result,
    StatusFile,
} from "../types/types";

const loadFromLocalStorage = (): HistoryResult[] => {
    const raw = localStorage.getItem("files");
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error("Ошибка парсинга из localStorage", e);
        return [];
    }
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    history: loadFromLocalStorage(),

    addToHistory: (
        status: StatusFile,
        fileName: string | null,
        result: Result | undefined
    ) => {
        const state = get();

        const id = state.history.length;

        console.log("id " + id);

        const newHistory = [
            {
                fileName: fileName,
                date: new Date(),
                status: status,
                ...result,
                id: id,
            },
            ...state.history,
        ];

        set({
            history: newHistory,
        });

        localStorage.setItem("files", JSON.stringify(newHistory));
    },

    deleteFile: (fileId) => {
        const state = get();
        const newHistory = state.history.filter((file) => file.id !== fileId);

        set({
            history: newHistory,
        });

        if (newHistory.length === 0) {
            get().clearHistory(); // всё равно чистим localStorage
        } else {
            localStorage.setItem("files", JSON.stringify(newHistory));
        }
    },

    clearHistory: () => {
        set({ history: [] });
        localStorage.removeItem("files");
    },
}));
