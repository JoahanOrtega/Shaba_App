import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import {
  AuthLogin,
  AuthCheck,
  AuthLogout,
  AuthRegister,
} from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";
import { deleteUser } from "../../../actionsUser/user";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  removeAccount: (userId: number) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  register: async (
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const resp = await AuthRegister(
      firstName,
      lastName,
      address,
      phone,
      email,
      password,
      password_confirmation
    );
    if (!resp) {
      //no esta autenticado
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    set({ status: "unauthenticated", token: undefined, user: undefined });
    return true;
  },
  login: async (email: string, password: string) => {
    const resp = await AuthLogin(email, password);
    if (!resp) {
      //no esta autenticado
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    // save token and user in storage
    await StorageAdapter.setItem("token", resp.token);
    // const storedToken = await StorageAdapter.getItem("token");
    // console.log({ storedToken });

    set({ status: "authenticated", token: resp.token, user: resp.user });
    return true;
  },

  checkStatus: async () => {
    const resp = await AuthCheck();

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem("token", resp.token);
    set({ status: "authenticated", token: resp.token, user: resp.user });
  },

  logout: async () => {
    const resp = await AuthLogout();
    if (!resp) return;
    await StorageAdapter.removeItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
  removeAccount: async (userId: number) => {
    const resp = await deleteUser(userId);
    if (resp !== null) {
      await StorageAdapter.removeItem("token");
      set({ status: "unauthenticated", token: undefined, user: undefined });
      // return true;
    } else {
      // return false;
    }
  },
}));
