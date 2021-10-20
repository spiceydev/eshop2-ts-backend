export interface CreateUserDto {
  email: string;
  password: string;
  permissionFlags?: number;
  name?: string;
  phone?: string;
  street?: string;
  postCode?: string;
  city?: string;
  country?: string;
}
