export default async function handleFetchResponse(
  res: Response
  //resJson: any
): Promise<any> {
  const contentType = res.headers.get("Content-Type");
  let resJson: any;

  if (contentType?.includes("application/json")) {
    resJson = await res.json();
  } else {
    const text = await res.text();
    throw new Error(
      `Invalid response type: ${contentType}. Expected application/json, got ${text}`
    );
  }

  if (!res.ok) {
    const msg =
      "message" in resJson ? resJson.message : "internal server error";

    throw new Error(`Error: ${msg} - Status: ${res.status}`);
  }

  return resJson;
}
