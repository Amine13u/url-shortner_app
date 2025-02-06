import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const { shortId } = useParams<{ shortId: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToLongUrl = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${shortId}`
        );

        if (response.data.longUrl) {
          window.location.href = response.data.longUrl;
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // Handle the case where the shortened URL is not found
          setError("This shortened URL does not exist.");
        } else {
          // Handle other errors (e.g., network issues, server errors)
          setError(
            "An error occurred while fetching the URL. Please try again later."
          );
        }
        console.error("Error fetching the long URL: ", error);
      }
    };

    redirectToLongUrl();
  }, [shortId]);

  return (
    <div className="text-red-500 mt-4 font-semibold">
      {error && <p>{error}</p>}
    </div>
  );
};

export default RedirectPage;
