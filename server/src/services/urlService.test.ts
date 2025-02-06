import { isValidUrl, generateQRCode, generateShortId } from "./urlService";

describe("URL Service", () => {
  describe("isValidUrl", () => {
    it("should return true for valid URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
    });

    it("should return false for invalid URLs", () => {
      expect(isValidUrl("invalid-url")).toBe(false);
      expect(isValidUrl("ftp://example.com")).toBe(false);
    });
  });

  describe("generateQRCode", () => {
    it("should generate a QR code as a data URL", async () => {
      const qrCode = await generateQRCode("https://example.com");
      expect(qrCode).toMatch(/^data:image\/png;base64,/);
    });

    it("should return an empty string on error", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error
      jest
        .spyOn(require("qrcode"), "toDataURL")
        .mockRejectedValue(new Error("QR code error"));

      const qrCode = await generateQRCode("invalid");
      expect(qrCode).toBe("");
      expect(console.error).toHaveBeenCalledWith(
        "Error generating QR code:",
        expect.any(Error)
      );

      (console.error as jest.Mock).mockRestore(); // Restore console.error
    });
  });

  describe("generateShortId", () => {
    it("should generate a unique short ID", () => {
      const shortId1 = generateShortId();
      const shortId2 = generateShortId();
      expect(shortId1).toHaveLength(8);
      expect(shortId2).toHaveLength(8);
      expect(shortId1).not.toBe(shortId2);
    });
  });
});
