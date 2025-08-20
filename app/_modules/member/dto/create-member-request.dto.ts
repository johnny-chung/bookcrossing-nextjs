export type CreateMemberRequestAuth0Dto = {
  given_name: string;
  family_name: string;
  name: string;
  username: string;
  email: string;
  password: string;
};


export type CreateMemberRequestServiceDto = {
  auth0Id: string;
  name: string;
  email: string;
}