export interface User {
  readonly name: string;
  readonly password: string;
  readonly id: string;
}

export function initializeUser(): User {
  let newUser: User = {
    name: "",
    password: "",
    id: "",
  };
  return newUser;
}
