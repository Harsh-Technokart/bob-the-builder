import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  SASProtocol,
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
  try {
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
  } catch (error) {
    throw error;
  }
};

async function generatePresignedUrl(blobName: string): Promise<{
  status: boolean;
  file_access_url: string;
  message: string;
}> {
  try {
    if (blobName.length > 0) {
      const credentials = new StorageSharedKeyCredential(
        accountName,
        accountKey
      );

      // Create a Blob Service Client
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        credentials
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const sasOptions = {
        containerName: containerName,
        blobName,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 15 * 60 * 1000), // 15 minutes to the Presigned Url expire time
        permissions: BlobSASPermissions.parse("r"),
        protocol: SASProtocol.Https,
      };
      // Generate the pre-signed URL
      const sasUrl = await blockBlobClient.generateSasUrl(sasOptions);
      const customSasUrl = `http://localhost:3001/server/stream?blobName=${
        sasUrl.split("?")[0]
      }&${sasUrl.split("?")[1]}`;
      return await Promise.resolve({
        status: true,
        file_access_url: customSasUrl,
        message: "File Found. Access Link valid uptil 15 minutes",
      });
    }
    return await Promise.resolve({
      status: false,
      file_access_url: "",
      message: "File Not Found",
    });
  } catch (error) {
    throw error;
  }
}

export { uploadDocument, generatePresignedUrl };
