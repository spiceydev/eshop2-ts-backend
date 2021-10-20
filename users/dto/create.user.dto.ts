export interface CreateUserDto {
  id: string;
  email: string;
  passwordHash: string;
  permissionLevel?: number;
  name?: string;
  phone?: string;
  street?: string;
  postCode?: string;
  city?: string;
  country?: string;
}
