// Authentication utilities

import api from "./api";

// Types
export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
}

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return (
    localStorage.getItem("userLoggedIn") === "true" &&
    !!localStorage.getItem("token")
  );
};

// Check if admin is logged in
export const isAdminLoggedIn = (): boolean => {
  return (
    sessionStorage.getItem("adminLoggedIn") === "true" &&
    !!localStorage.getItem("token")
  );
};

// Login user
export const loginUser = async (phone: string, pin: string): Promise<User> => {
  try {
    const response = await api.auth.login(phone, pin);
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response.user;
  } catch (error) {
    throw error;
  }
};

// Login admin
export const loginAdmin = async (
  email: string,
  password: string,
): Promise<AdminUser> => {
  try {
    const response = await api.auth.adminLogin(email, password);
    sessionStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("token", response.token);
    localStorage.setItem("adminUser", JSON.stringify(response.user));
    return response.user;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Logout admin
export const logoutAdmin = (): void => {
  sessionStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    return null;
  }
};

// Get current admin user
export const getCurrentAdminUser = (): AdminUser | null => {
  const adminUserJson = localStorage.getItem("adminUser");
  if (!adminUserJson) return null;
  try {
    return JSON.parse(adminUserJson);
  } catch (error) {
    return null;
  }
};

// Fetch and update user profile
export const fetchUserProfile = async (): Promise<any> => {
  try {
    const response = await api.auth.getProfile();
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  } catch (error) {
    throw error;
  }
};
