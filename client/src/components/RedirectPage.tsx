import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const { shortId } = useParams<{ shortId: string }>();

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
        console.error("Error fetching the long URL: ", error);
      }
    };

    redirectToLongUrl();
  }, [shortId]);

  return <></>;
};

export default RedirectPage;
