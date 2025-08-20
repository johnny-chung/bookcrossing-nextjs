import "server-only";
import { LRUCache } from "lru-cache";

const MGT_ENDPOINT = process.env.AUTH0_MGT_ENDPOINT;
const MGT_CLIENT_ID = process.env.AUTH0_MGT_CLIENT_ID;
const MGT_CLIENT_SECRET = process.env.AUTH0_MGT_CLIENT_SECRET;
const MGT_CLIENT_AUDIENCE = process.env.AUTH0_MGT_AUDIENCE;

// lru cache to store token base one auth0 return expiry
const tokenCache = new LRUCache<string, string>({
  max: 1, // only 1 token
});

export async function getAuth0MgtToken(): Promise<string> {
  try {
    if (
      !MGT_ENDPOINT ||
      !MGT_CLIENT_ID ||
      !MGT_CLIENT_SECRET ||
      !MGT_CLIENT_AUDIENCE
    ) {
      throw new Error("Internal Server Error");
    }

    const cached = tokenCache.get("token");
    if (cached) return cached;

    const res = await fetch(MGT_ENDPOINT, {
      //const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: MGT_CLIENT_ID,
        client_secret: MGT_CLIENT_SECRET,
        audience: MGT_CLIENT_AUDIENCE,
      }).toString(),
    });

    const resJson = await res.json();

    if (!res.ok || !resJson.access_token || !resJson.expires_in) {
      throw new Error("Failed to get Auth0 management token");
    }

    // Cache with dynamic TTL (ms) using return from auth 0
    const ttl = (resJson.expires_in - 60) * 1000; // subtract 60s buffer
    tokenCache.set("token", resJson.access_token, { ttl });

    return resJson.access_token;
  } catch (error) {
    throw error;
  }
}
