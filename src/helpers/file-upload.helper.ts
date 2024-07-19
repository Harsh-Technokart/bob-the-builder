import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const accountName = process.env.AZURE_ACCOUNT_NAME ?? "";
const accountKey = process.env.AZURE_ACCOUNT_KEY ?? "";
const containerName = process.env.AZURE_CONTAINER_NAME ?? "";

const uploadDocument = async (
  file_name: string,
  file_buffer: Buffer,
  subtype_id: string
) => {
  const dirName = `bob-the-builder/${file_name}`;
  const creds = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    creds
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(dirName);
  await blockBlobClient.uploadData(file_buffer);
  return {
    file_name,
    file_access_url: dirName,
    subtype_id,
  };
};

export { uploadDocument };
