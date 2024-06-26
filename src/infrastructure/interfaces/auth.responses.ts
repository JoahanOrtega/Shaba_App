// this is a bridge we have to do
export interface AuthResponse {
  status: string;
  meesage: string;
  token: string;
  data: Data;
}

export interface Data {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  email_verified_at?: any;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthLogoutResponse {
  status: string;
  meesage: string;
}
export interface AuthRegisterResponse {
  status: string;
  meesage: string;
  data: DataRegister;
}

export interface DataRegister {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}
