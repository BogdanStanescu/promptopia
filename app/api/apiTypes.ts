export interface PromptResponse {
  _id: string;
  creator: User;
  title: string;
  tag: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  image?: string;
}

export interface OAuthProfile {
  email?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}
