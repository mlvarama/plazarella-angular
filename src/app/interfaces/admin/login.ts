export interface ResponseLogin {
  token: string;
  name: string;
}

export interface RequestLogin {
  user: string;
  password: string;
}
