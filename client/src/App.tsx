import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlShortener from "./components/UrlShortener";
import UrlList from "./components/UrlList";
import RedirectPage from "./components/RedirectPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            🔗 URL Shortener
          </h1>
          <UrlShortener onUrlShortened={() => setRefresh((prev) => prev + 1)} />
          <UrlList key={refresh} />
        </div>
        <ToastContainer position="top-center" />

        {/* Set up routes for the app */}
        <Routes>
          <Route path="/:shortId" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
