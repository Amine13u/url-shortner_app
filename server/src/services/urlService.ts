import qrcode from "qrcode";
import { customAlphabet } from "nanoid";

// Custom alphabet for NanoID
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8); // Generates a 8-character ID

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await qrcode.toDataURL(text);
  } catch (err) {
    console.error("Error generating QR code:", err);
    return "";
  }
};

export const generateShortId = (): string => {
  return nanoid(); // Generate a random ID
};
