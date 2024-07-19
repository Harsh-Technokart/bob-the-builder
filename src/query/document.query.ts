import { UploadedFile } from "express-fileupload";
import { uploadDocument } from "../helpers/file-upload.helper";
import { file as fileModel } from "../models";

const uploadDocumentsForSpecificSubtype = async (
  file: UploadedFile,
  subtype_id: string
) => {
  try {
    const fileJson = await uploadDocument(file.name, file.data, subtype_id);
    await fileModel.create(fileJson);
    return {
      status: true,
      status_code: 200,
      message: `File uploaded`,
    };
  } catch (error) {
    throw error;
  }
};

export { uploadDocumentsForSpecificSubtype };
