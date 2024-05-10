import { registerAs } from "@nestjs/config";

export default registerAs('cloudinary', () => ({
  cloud_name: process.env.CLOUDINARY_NAME || "duhncgkpo",
  api_key: process.env.CLOUDINARY_API_KEY || "425358843362883",
  api_secret: process.env.CLOUDINARY_API_SECRET || "LWXbOOgeXvXmo2ASjXtpeIr6w1U",
}));