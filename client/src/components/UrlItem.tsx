import { useState } from "react";
import { deleteUrl } from "../services/api";
import { toast } from "react-toastify";
import { FaCopy, FaTrash, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

const UrlItem = ({
  url,
  onUrlDeleted,
}: {
  url: { shortId: string; longUrl: string; clicks: number };
  onUrlDeleted: () => void;
}) => {
  const [showQR, setShowQR] = useState(false);
  const baseUrl = window.location.origin;

  const handleDelete = async () => {
    try {
      await deleteUrl(url.shortId);
      toast.success("URL deleted");
      onUrlDeleted();
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseUrl}/${url.shortId}`);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-100">
        <td className="p-3 truncate max-w-xs">{url.longUrl}</td>
        <td className="p-3">
          <a href={`${baseUrl}/${url.shortId}`} className="text-blue-600">
            {window.location.host}/{url.shortId}
          </a>
        </td>
        <td className="p-3">{url.clicks}</td>
        <td className="p-3 flex gap-3">
          <button
            onClick={() => setShowQR(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaQrcode />
          </button>
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaCopy />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </td>
      </tr>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-3">QR Code</h2>
            <QRCodeCanvas value={`${baseUrl}/${url.shortId}`} size={150} />
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlItem;
