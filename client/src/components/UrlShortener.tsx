import { useState } from "react";
import { shortenUrl } from "../services/api";
import { isValidUrl } from "../utils/validators";
import { toast } from "react-toastify";

const UrlShortener = ({ onUrlShortened }: { onUrlShortened: () => void }) => {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!isValidUrl(longUrl)) {
      toast.error("Invalid URL!");
      return;
    }

    setLoading(true);
    try {
      await shortenUrl(longUrl);
      toast.success("URL shortened successfully!");
      setLongUrl("");
      onUrlShortened();
    } catch (error) {
      toast.error("Failed to shorten URL");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Shorten a URL</h2>
      <div className="flex mt-3">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md p-2 focus:ring focus:ring-blue-300"
          placeholder="Enter URL..."
        />
        <button
          onClick={handleShorten}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition duration-300"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>
    </div>
  );
};

export default UrlShortener;
