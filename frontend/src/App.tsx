import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DownloadPage } from "./pages/DownloadPage/DownloadPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DownloadPage />} />
            </Routes>
        </BrowserRouter>
    );
}
