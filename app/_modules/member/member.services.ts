import "server-only";
import { CreateUserSchema } from "./zod/create-user-schema";
import { createAuth0User } from "@/app/_services/auth0/createAuth0User";
import { auth } from "@/app/_lib/authentication/auth";
import { CreateMemberRequestAuth0Dto } from "@/app/_modules/member/dto/create-member-request.dto";
import { CreateMemberResponseDto } from "./dto/create-member-response.dto";
import { MemberDetailsDto } from "./dto/member-details.dto";
import { access } from "fs";
import { BACKEND_URL } from "@/app/_lib/constant/backend";

export async function createUser(
  userData: CreateMemberRequestAuth0Dto
): Promise<CreateMemberResponseDto> {
  try {
    // Validate the input data
    const parsedData = CreateUserSchema.parse(userData);

    // Call the Auth0 user creation service
    const userId = await createAuth0User(parsedData);

    // Prepare the member payload for the backend service
    const memberPayload = {
      auth0Id: userId,
      name: parsedData.name,
      email: parsedData.email,
    };

    const response = await fetch(`${BACKEND_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberPayload),
    });
    if (!response.ok) throw new Error("Failed to create member in backend");
    const member = await response.json();
    return member;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getMemberByAuth0Id(
  auth0Id: string,
  accessToken?: string
): Promise<MemberDetailsDto> {
  let token;
  if (!accessToken) {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");
    token = session.accessToken;
  } else {
    token = accessToken;
  }
  console.log(
    "Fetching member by Auth0 ID:",
    encodeURIComponent(auth0Id),
    "with token:",
    token
  );

  const response = await fetch(
    `${BACKEND_URL}/members/profile/${encodeURIComponent(auth0Id)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("res", JSON.stringify(response));
  if (!response.ok) {
    throw new Error("Failed to fetch member");
  }

  return response.json();
}
