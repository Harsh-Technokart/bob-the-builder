import { IFileTypeModel, type IFunctionReturnType } from "../interface";
import { type UploadedFile } from "express-fileupload";
import {
  uploadDocument,
  generatePresignedUrl,
} from "../helpers/file-upload.helper";
import { file as fileModel } from "../models";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const uploadDocumentsForSpecificSubtype = async (
  file: UploadedFile,
  subtype_id: string
): IFunctionReturnType => {
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

const getPresignedUrl = async (document_id: string): IFunctionReturnType => {
  try {
    const document: IFileTypeModel | null = await fileModel.findOne({
      _id: new ObjectId(document_id),
    });
    if (!document) {
      return {
        status: false,
        status_code: 404,
        message: "Entry not found in the database",
      };
    } else {
      const presigned = await generatePresignedUrl(document.file_access_url);
      if (presigned.status) {
        return {
          status: true,
          status_code: 200,
          message: presigned.message,
          data: presigned.file_access_url,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: presigned.message,
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

const streamPresignedUrls = async (
  blobName: string,
  sv: string,
  spr: string,
  st: string,
  se: string,
  sr: string,
  sp: string,
  sig: string
) => {
  console.log("Trying to fetch blob:", blobName);
  try {
    const url = `${blobName}?sv=${sv}&st=${st}&spr=${spr}&se=${se}&sr=${sr}&sp=${sp}&sig=${encodeURIComponent(
      sig
    )}`;
    console.log("Constructed URL:", url);

    const response = await fetch(url);
    console.warn("Response received from streaming:", response);

    if (!response.ok) {
      throw new Error("Incorrect presigned URL detected");
    }

    return {
      status: true,
      statusCode: 200,
      data: response.url,
    };
  } catch (error) {
    throw error;
  }
};

export {
  uploadDocumentsForSpecificSubtype,
  getPresignedUrl,
  streamPresignedUrls,
};
