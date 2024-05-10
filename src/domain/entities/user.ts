export interface User {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  email_verified_at?: null;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}
