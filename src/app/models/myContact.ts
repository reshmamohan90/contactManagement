export interface MyContact {
  id?: string;
  name: string;
  email: string;
  photo: string;
  mobile: string;
  company: string;
  title: string | null;
  groupId: string;
}

export interface UserDetails extends MyContact {
  userName?: string;
}
