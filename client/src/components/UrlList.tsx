import { useState, useEffect } from "react";
import { getUrls } from "../services/api";
import UrlItem from "./UrlItem";
import { toast } from "react-toastify";

const UrlList = () => {
  const [urls, setUrls] = useState<
    { shortId: string; longUrl: string; clicks: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const data = await getUrls();
      setUrls(data);
    } catch (error) {
      toast.error("Failed to fetch URLs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Your Shortened URLs
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Original URL</th>
              <th className="p-3">Shortened</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : urls.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No URLs yet.
                </td>
              </tr>
            ) : (
              urls.map((url) => (
                <UrlItem key={url.shortId} url={url} onUrlDeleted={fetchUrls} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
