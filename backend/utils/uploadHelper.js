import cloudinary from "./cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (file, folder) => {
  try {
    if (!file || !file.path) {
      throw new Error("Invalid file or file path missing.");
    }

    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: resourceType,
    });

    // Delete the temporary file after upload
    fs.unlinkSync(file.path);

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
