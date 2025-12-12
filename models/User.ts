import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  name: String,
  email: { type: String, unique: true },
  image: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
