import "server-only";
import { getAuth0MgtToken } from "@/app/_services/auth0/managementAPI";
import handleFetchResponse from "@/app/_lib/utils/handleFetchResponse";

// create user in auth0 using management api

const MGT_CLIENT_AUDIENCE = process.env.AUTH0_MGT_AUDIENCE;
const MGT_CLIENT_CONNECTION = process.env.AUTH0_MGT_CONNECTION;

export type CreateAuth0UserRequest = {
  given_name: string;
  family_name: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export async function createAuth0User(
  request: CreateAuth0UserRequest
): Promise<string> {
  try {
    const mgtToken = await getAuth0MgtToken();

    const res = await fetch(`${MGT_CLIENT_AUDIENCE!}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mgtToken}`,
      },
      body: JSON.stringify({
        verify_email: true,
        connection: MGT_CLIENT_CONNECTION,
        ...request,
      }),
    });
    const resJson = await handleFetchResponse(res);
    return resJson.user_id;
  } catch (error: any) {
    console.error(error?.message ?? "create auth0 user error");
    throw error;
  }
}
