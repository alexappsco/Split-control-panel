export interface UserType {
  id: string;
  name: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

// export interface SpaceType {
//   spaceId: string;
//   spaceName: string;
//   categoryName: string;
//   isActive: boolean;
// }
export interface SpaceType {
  id: string;
  spaceId: string;
  spaceName: string;
  categoryName: string;
  isActive: boolean;
};

export interface Employee {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: string;
  joinDate: string;
  phone: string;
  status: 'active' | 'inactive';
  avatarUrl?: string;
}