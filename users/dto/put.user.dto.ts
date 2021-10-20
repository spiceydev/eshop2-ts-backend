export interface PutUserDto {
  id: string;
  email: string;
  passwordHash: string;
  permissionLevel: number;
  name: string;
  phone: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
}
