//actions of auth (login & register)

import { shabaApi } from "../../../api/shabaApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.data.id,
    first_name: data.data.first_name,
    last_name: data.data.last_name,
    address: data.data.address,
    email: data.data.email,
    phone: data.data.phone,
  };
  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await shabaApi.post<AuthResponse>("/login", {
      email,
      password,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
