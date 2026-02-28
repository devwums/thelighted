// frontend/src/lib/api/admin.ts
import { useAuthStore } from "../store/authStore";
import type { AdminUser } from "../types/user";
import { apiClient } from "./client";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: string;
}

// Auth Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AdminUser;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  restaurantName: string;
  restaurantPhone: string;
  restaurantEmail: string;
}

export interface RegisterReponse {
  accessToken: string;
  user: AdminUser;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Dashboard Types
export interface DashboardStats {
  menu: {
    total: number;
    available: number;
    unavailable: number;
  };
  contacts: {
    total: number;
    new: number;
    read: number;
  };
  analytics: {
    last7Days: number;
  };
  popularItems: Array<{
    id: string;
    name: string;
    clicks: number;
  }>;
}

// Instagram Types
export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
  isVisible: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstagramPostData {
  imageUrl: string;
  caption: string;
  permalink: string;
  isVisible?: boolean;
  displayOrder?: number;
}

export interface UpdateInstagramPostData {
  imageUrl?: string;
  caption?: string;
  permalink?: string;
  isVisible?: boolean;
  displayOrder?: number;
}

// Gallery Types
export type GalleryCategory =
  | "food"
  | "ambiance"
  | "kitchen"
  | "events"
  | "drinks";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  category: GalleryCategory;
  isVisible: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryImageData {
  imageUrl: string;
  alt: string;
  category: GalleryCategory;
  isVisible?: boolean;
  displayOrder?: number;
}

export interface UpdateGalleryImageData {
  imageUrl?: string;
  alt?: string;
  category?: GalleryCategory;
  isVisible?: boolean;
  displayOrder?: number;
}

// Admin API
export const adminApi = {
  // ==================== USER CREATION ====================
  createUser: async (data: CreateUserDto): Promise<AdminUser> => {
    return apiClient.post<AdminUser>("/admin/users", data);
  },

  // ==================== AUTH ====================
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>("/auth/login", credentials);
  },

  register: async (data: RegisterCredentials): Promise<RegisterReponse> => {
    return apiClient.post<RegisterReponse>("/auth/register", data);
  },

  logout: async (): Promise<{ message: string }> => {
    return apiClient.post("/auth/logout");
  },

  getProfile: async (): Promise<AdminUser> => {
    return apiClient.get<AdminUser>("/auth/me");
  },

  changePassword: async (
    data: ChangePasswordData,
  ): Promise<{ message: string }> => {
    return apiClient.post("/auth/change-password", data);
  },

  updateProfile: async (data: any): Promise<any> => {
    return apiClient.patch("/auth/profile", data);
  },

  // ==================== DASHBOARD ====================
  getDashboard: async (): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>("/admin/dashboard");
  },

  // ==================== AUDIT LOGS ====================
  getAuditLogs: async (limit: number = 50): Promise<any[]> => {
    return apiClient.get(`/admin/audit-logs?limit=${limit}`);
  },

  // ==================== ADMIN USERS ====================
  getAdmins: async (): Promise<AdminUser[]> => {
    return apiClient.get<AdminUser[]>("/admin/users");
  },

  toggleAdminStatus: async (
    id: string,
    isActive: boolean,
  ): Promise<{ message: string }> => {
    return apiClient.put(`/admin/users/${id}/status`, { isActive });
  },

  updateAdminRole: async (
    id: string,
    role: string,
  ): Promise<{ message: string }> => {
    return apiClient.put(`/admin/users/${id}/role`, { role });
  },

  // ==================== MENU ====================
  getAllMenuItems: async (): Promise<any[]> => {
    // const user = useAuthStore.getState().user;
    // const restaurantId = user?.restaurantId;

    // if (!restaurantId) {
    //   throw new Error("Restaurant ID not found");
    // }

    return apiClient.get(`/menu/admin`);
  },

  getMenuItem: async (id: string): Promise<any> => {
    return apiClient.get(`/menu/${id}`);
  },

  createMenuItem: async (data: any): Promise<any> => {
    return apiClient.post("/menu", data);
  },

  updateMenuItem: async (id: string, data: any): Promise<any> => {
    return apiClient.put(`/menu/${id}/update`, data);
  },

  deleteMenuItem: async (id: string): Promise<void> => {
    return apiClient.delete(`/menu/${id}`);
  },

  toggleMenuItemAvailability: async (id: string): Promise<any> => {
    return apiClient.post(`/menu/${id}/toggle-availability`);
  },

  // ==================== CONTACTS ====================
  getAllContacts: async (): Promise<any[]> => {
    return apiClient.get("/contact");
  },

  getContact: async (id: string): Promise<any> => {
    return apiClient.get(`/contact/${id}`);
  },

  getNewContactsCount: async (): Promise<{ count: number }> => {
    return apiClient.get("/contact/new-count");
  },

  updateContactStatus: async (id: string, status: string): Promise<any> => {
    return apiClient.put(`/contact/${id}/status`, { status });
  },

  deleteContact: async (id: string): Promise<void> => {
    return apiClient.delete(`/contact/${id}`);
  },

  // ==================== ANALYTICS ====================
  getAnalytics: async (days: number = 30): Promise<any> => {
    return apiClient.get(`/analytics?days=${days}`);
  },

  getMenuAnalytics: async (): Promise<any> => {
    return apiClient.get("/analytics/menu");
  },

  getContactAnalytics: async (): Promise<any> => {
    return apiClient.get("/analytics/contacts");
  },

  getTrendingItems: async (limit: number = 10): Promise<any[]> => {
    return apiClient.get(`/analytics/trending?limit=${limit}`);
  },

  // ==================== USER MANAGEMENT ====================
  getAllAdminUsers: async (): Promise<any[]> => {
    return apiClient.get("/admin/users");
  },

  getAdminUser: async (id: string): Promise<any> => {
    return apiClient.get(`/admin/users/${id}`);
  },

  toggleAdminUserStatus: async (
    id: string,
    isActive: boolean,
  ): Promise<any> => {
    return apiClient.put(`/admin/users/${id}/status`, { isActive });
  },

  // ==================== AUDIT LOGS ====================
  getAuditLogsByEntity: async (entityType: string): Promise<any[]> => {
    return apiClient.get(`/admin/audit-logs/entity/${entityType}`);
  },

  getAuditLogsByAction: async (action: string): Promise<any[]> => {
    return apiClient.get(`/admin/audit-logs/action/${action}`);
  },

  getAuditLogsByAdmin: async (adminId: string): Promise<any[]> => {
    return apiClient.get(`/admin/audit-logs/admin/${adminId}`);
  },

  // ==================== INSTAGRAM ====================
  getAllInstagramPosts: async (): Promise<InstagramPost[]> => {
    return apiClient.get<InstagramPost[]>("/instagram/all");
  },

  getInstagramPost: async (id: string): Promise<InstagramPost> => {
    return apiClient.get<InstagramPost>(`/instagram/${id}`);
  },

  createInstagramPost: async (
    data: CreateInstagramPostData,
  ): Promise<InstagramPost> => {
    return apiClient.post<InstagramPost>("/instagram", data);
  },

  updateInstagramPost: async (
    id: string,
    data: UpdateInstagramPostData,
  ): Promise<InstagramPost> => {
    return apiClient.put<InstagramPost>(`/instagram/${id}`, data);
  },

  deleteInstagramPost: async (id: string): Promise<void> => {
    return apiClient.delete(`/instagram/${id}`);
  },

  toggleInstagramPostVisibility: async (id: string): Promise<InstagramPost> => {
    return apiClient.post<InstagramPost>(`/instagram/${id}/toggle-visibility`);
  },

  // ==================== GALLERY ====================
  getAllGalleryImages: async (): Promise<GalleryImage[]> => {
    return apiClient.get<GalleryImage[]>("/gallery/all");
  },

  getGalleryImage: async (id: string): Promise<GalleryImage> => {
    return apiClient.get<GalleryImage>(`/gallery/${id}`);
  },

  createGalleryImage: async (
    data: CreateGalleryImageData,
  ): Promise<GalleryImage> => {
    return apiClient.post<GalleryImage>("/gallery", data);
  },

  updateGalleryImage: async (
    id: string,
    data: UpdateGalleryImageData,
  ): Promise<GalleryImage> => {
    return apiClient.put<GalleryImage>(`/gallery/${id}`, data);
  },

  deleteGalleryImage: async (id: string): Promise<void> => {
    return apiClient.delete(`/gallery/${id}`);
  },

  toggleGalleryImageVisibility: async (id: string): Promise<GalleryImage> => {
    return apiClient.post<GalleryImage>(`/gallery/${id}/toggle-visibility`);
  },
};
