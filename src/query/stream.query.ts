const streamPresignedUrls = async (
  blobName: string,
  sv: string,
  spr: string,
  st: string,
  se: string,
  sr: string,
  sp: string,
  sig: string
): Promise<Response> => {
  try {
    const url = `${blobName}?sv=${sv}&st=${st}&spr=${spr}&se=${se}&sr=${sr}&sp=${sp}&sig=${encodeURIComponent(
      sig
    )}`;
    const response: Response = await fetch(url);
    console.warn("Response received from streaming:", response);

    if (!response.ok) {
      throw new Error("Incorrect presigned URL detected");
    }

    // Assert the type of response.body as ReadableStream<any>
    return response;
  } catch (error) {
    throw error;
  }
};

export { streamPresignedUrls };
