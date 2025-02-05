import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
  longUrl: string;
  shortId: string;
  clicks: number;
  qrCode: string;
}

const UrlSchema: Schema = new Schema(
  {
    longUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    qrCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUrl>("Url", UrlSchema);
