import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

interface IReturnType {
  storage: multer.StorageEngine;
}

export default {
  upload(folder: string): IReturnType {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
