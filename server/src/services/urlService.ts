import qrcode from "qrcode";

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

export const generateShortId = async (): Promise<string> => {
  const { nanoid } = await import("nanoid");
  return nanoid();
};
