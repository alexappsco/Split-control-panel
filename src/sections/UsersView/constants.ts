export type UserStatus = "active" | "inactive" | "blocked";

export type UserGroup = {
  id: string;
  groupName: string;
  category: string;
  status: "active" | "inactive";
};

export type AppUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  nationality: string;
  groupsCount: number;
  avatarUrl?: string;
  status: UserStatus;
  groups: UserGroup[];
};

export const MOCK_USERS: AppUser[] = [
  {
    id: "1",
    name: "محمد أحمد",
    username: "هاني محمد",
    email: "userone@gmail.com",
    phone: "+966 5123 44550",
    nationality: "سعودي",
    groupsCount: 5,
    status: "active",
    groups: [
      { id: "g1", groupName: "رحلة الساحل", category: "فواتير", status: "active" },
      { id: "g2", groupName: "شقة الرياض", category: "سكن", status: "active" },
      { id: "g3", groupName: "سكن مشترك", category: "مواصلات", status: "inactive" },
      { id: "g4", groupName: "مكتب العمل", category: "أكل", status: "active" },
      { id: "g5", groupName: "رحلة العلا", category: "فواتير", status: "active" },
    ],
  },
  {
    id: "2",
    name: "أحمد علي",
    username: "أحمد علي",
    email: "ahmed.ali@gmail.com",
    phone: "+966 5123 11556",
    nationality: "سعودي",
    groupsCount: 3,
    status: "active",
    groups: [
      { id: "g6", groupName: "شقة جدة", category: "سكن", status: "active" },
      { id: "g7", groupName: "مشروع التخرج", category: "تعليم", status: "active" },
      { id: "g8", groupName: "بيت العائلة", category: "فواتير", status: "inactive" },
    ],
  },
  {
    id: "3",
    name: "فاطمة سعد",
    username: "فاطمة سعد",
    email: "fatima.saad@gmail.com",
    phone: "+966 5555 22110",
    nationality: "سعودية",
    groupsCount: 4,
    status: "inactive",
    groups: [
      { id: "g9", groupName: "فيلا الدمام", category: "سكن", status: "inactive" },
      { id: "g10", groupName: "شقة الخبر", category: "سكن", status: "inactive" },
    ],
  },
  {
    id: "4",
    name: "خالد يوسف",
    username: "خالد يوسف",
    email: "khaled.y@gmail.com",
    phone: "+966 5444 88990",
    nationality: "سعودي",
    groupsCount: 2,
    status: "active",
    groups: [
      { id: "g11", groupName: "رحلة أبها", category: "مواصلات", status: "active" },
      { id: "g12", groupName: "شقة الطائف", category: "سكن", status: "active" },
    ],
  },
  {
    id: "5",
    name: "نورة إبراهيم",
    username: "نورة إبراهيم",
    email: "nora.ib@gmail.com",
    phone: "+966 5333 77665",
    nationality: "سعودية",
    groupsCount: 6,
    status: "active",
    groups: [
      { id: "g13", groupName: "سكن الجامعة", category: "سكن", status: "active" },
      { id: "g14", groupName: "رحلة البحر", category: "ترفيه", status: "active" },
      { id: "g15", groupName: "مجموعة العمل", category: "فواتير", status: "active" },
    ],
  },
  {
    id: "6",
    name: "عمر خالد",
    username: "عمر خالد",
    email: "omar.k@gmail.com",
    phone: "+966 5666 33445",
    nationality: "سعودي",
    groupsCount: 1,
    status: "blocked",
    groups: [
      { id: "g16", groupName: "شقة الرياض", category: "سكن", status: "inactive" },
    ],
  },
  {
    id: "7",
    name: "سارة محمود",
    username: "سارة محمود",
    email: "sara.m@gmail.com",
    phone: "+966 5777 11223",
    nationality: "سعودية",
    groupsCount: 3,
    status: "active",
    groups: [
      { id: "g17", groupName: "رحلة الساحل", category: "مواصلات", status: "active" },
      { id: "g18", groupName: "مكتب العمل", category: "فواتير", status: "active" },
    ],
  },
  {
    id: "8",
    name: "ياسر فهد",
    username: "ياسر فهد",
    email: "yasser.f@gmail.com",
    phone: "+966 5888 99001",
    nationality: "سعودي",
    groupsCount: 4,
    status: "inactive",
    groups: [
      { id: "g19", groupName: "سكن مشترك", category: "سكن", status: "inactive" },
      { id: "g20", groupName: "رحلة العلا", category: "ترفيه", status: "inactive" },
    ],
  },
  {
    id: "9",
    name: "لينا أحمد",
    username: "لينا أحمد",
    email: "lina.a@gmail.com",
    phone: "+966 5999 44556",
    nationality: "سعودية",
    groupsCount: 2,
    status: "active",
    groups: [
      { id: "g21", groupName: "شقة جدة", category: "سكن", status: "active" },
      { id: "g22", groupName: "مجموعة الأصدقاء", category: "أكل", status: "active" },
    ],
  },
  {
    id: "10",
    name: "ماجد سالم",
    username: "ماجد سالم",
    email: "majed.s@gmail.com",
    phone: "+966 5012 66778",
    nationality: "سعودي",
    groupsCount: 5,
    status: "active",
    groups: [
      { id: "g23", groupName: "بيت العائلة", category: "فواتير", status: "active" },
      { id: "g24", groupName: "فيلا الدمام", category: "سكن", status: "active" },
      { id: "g25", groupName: "مشروع التخرج", category: "تعليم", status: "active" },
    ],
  },
  {
    id: "11",
    name: "هند علي",
    username: "هند علي",
    email: "hind.a@gmail.com",
    phone: "+966 5023 88991",
    nationality: "سعودية",
    groupsCount: 3,
    status: "blocked",
    groups: [
      { id: "g26", groupName: "شقة الخبر", category: "سكن", status: "inactive" },
      { id: "g27", groupName: "رحلة أبها", category: "مواصلات", status: "inactive" },
    ],
  },
];

export function getUserById(id: string): AppUser | undefined {
  return MOCK_USERS.find((user) => user.id === id);
}
