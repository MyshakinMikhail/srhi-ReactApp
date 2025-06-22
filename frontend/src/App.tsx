import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DownloadPage } from "./pages/DownloadPage/DownloadPage";
import { GeneratePage } from "./pages/GeneratePage/GeneratePage";
import { HistoryPage } from "./pages/HistoryPage/HistoryPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="*" element={<DownloadPage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}
