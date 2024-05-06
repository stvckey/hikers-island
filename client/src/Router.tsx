import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;