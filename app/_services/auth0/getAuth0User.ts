import "server-only";
import { getAuth0MgtToken } from "@/app/_services/auth0/managementAPI";
import handleFetchResponse from "@/app/_lib/utils/handleFetchResponse";
import { auth } from "@/app/_lib/authentication/auth";

// update user in auth0 using management api

const MGT_CLIENT_AUDIENCE = process.env.AUTH0_MGT_AUDIENCE;

export type GetAuth0UserResponse = {
  user_id: string;
  email: string;
  email_verified: boolean;
  username: string;
  phone_number?: string;
  phone_verified?: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  family_name: string;
  given_name: string;
  blocked: boolean;
  picture: string;
};

export async function getAuth0User(
  auth0Id: string
): Promise<GetAuth0UserResponse> {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    //console.log("session:", JSON.stringify(session));

    if (!auth0Id || auth0Id.length < 1) {
      throw new Error("Request invalid");
    }

    const mgtToken = await getAuth0MgtToken();

    const res = await fetch(`${MGT_CLIENT_AUDIENCE!}users/${auth0Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mgtToken}`,
      },
    });

    const resJson = await handleFetchResponse(res);
    //console.log("resJson", resJson)
    return resJson as GetAuth0UserResponse;
  } catch (error: any) {
    console.error(error?.message ?? "get auth0 user error");
    throw error;
  }
}
