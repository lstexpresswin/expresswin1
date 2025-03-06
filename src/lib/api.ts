// API client for making requests to the backend

// Base URL for API requests
const API_URL = import.meta.env.VITE_API_URL || "/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "حدث خطأ في الاتصال بالخادم",
    }));
    throw new Error(error.message || "حدث خطأ في الاتصال بالخادم");
  }
  return response.json();
};

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// API client object
const api = {
  // Auth endpoints
  auth: {
    login: async (phone: string, pin: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, pin }),
      });
      return handleResponse(response);
    },
    adminLogin: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    },
    getProfile: async () => {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    updateProfile: async (data: any) => {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  // Menu endpoints
  menu: {
    getCategories: async () => {
      const response = await fetch(`${API_URL}/menu/categories`);
      return handleResponse(response);
    },
    getItems: async (categoryId?: string) => {
      const url = categoryId
        ? `${API_URL}/menu/items?category=${categoryId}`
        : `${API_URL}/menu/items`;
      const response = await fetch(url);
      return handleResponse(response);
    },
    getItem: async (id: string) => {
      const response = await fetch(`${API_URL}/menu/items/${id}`);
      return handleResponse(response);
    },
  },

  // Order endpoints
  orders: {
    createOrder: async (orderData: any) => {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify(orderData),
      });
      return handleResponse(response);
    },
    getOrderHistory: async () => {
      const response = await fetch(`${API_URL}/orders/history`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    getOrderDetails: async (orderId: string) => {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
  },

  // Loyalty endpoints
  loyalty: {
    getCards: async () => {
      const response = await fetch(`${API_URL}/loyalty/cards`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    getCoinsBalance: async () => {
      const response = await fetch(`${API_URL}/loyalty/coins`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    getCoinsTransactions: async () => {
      const response = await fetch(`${API_URL}/loyalty/coins/transactions`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    redeemGift: async (code: string) => {
      const response = await fetch(`${API_URL}/loyalty/gifts/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify({ code }),
      });
      return handleResponse(response);
    },
    getGifts: async () => {
      const response = await fetch(`${API_URL}/loyalty/gifts`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    useGift: async (giftId: string) => {
      const response = await fetch(`${API_URL}/loyalty/gifts/${giftId}/use`, {
        method: "POST",
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
  },

  // Admin endpoints
  admin: {
    // Dashboard
    getDashboardStats: async () => {
      const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },

    // Orders
    getOrders: async (status?: string, dateRange?: string) => {
      let url = `${API_URL}/admin/orders`;
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (dateRange) params.append("dateRange", dateRange);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    updateOrderStatus: async (orderId: string, status: string) => {
      const response = await fetch(
        `${API_URL}/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken() || "",
          },
          body: JSON.stringify({ status }),
        },
      );
      return handleResponse(response);
    },

    // Menu management
    getAdminCategories: async () => {
      const response = await fetch(`${API_URL}/admin/menu/categories`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    createCategory: async (formData: FormData) => {
      const response = await fetch(`${API_URL}/admin/menu/categories`, {
        method: "POST",
        headers: {
          "x-auth-token": getToken() || "",
        },
        body: formData,
      });
      return handleResponse(response);
    },
    updateCategory: async (categoryId: string, formData: FormData) => {
      const response = await fetch(
        `${API_URL}/admin/menu/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": getToken() || "",
          },
          body: formData,
        },
      );
      return handleResponse(response);
    },
    getAdminMenuItems: async (categoryId?: string) => {
      let url = `${API_URL}/admin/menu/items`;
      if (categoryId) url += `?category=${categoryId}`;

      const response = await fetch(url, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    createMenuItem: async (formData: FormData) => {
      const response = await fetch(`${API_URL}/admin/menu/items`, {
        method: "POST",
        headers: {
          "x-auth-token": getToken() || "",
        },
        body: formData,
      });
      return handleResponse(response);
    },
    updateMenuItem: async (itemId: string, formData: FormData) => {
      const response = await fetch(`${API_URL}/admin/menu/items/${itemId}`, {
        method: "PUT",
        headers: {
          "x-auth-token": getToken() || "",
        },
        body: formData,
      });
      return handleResponse(response);
    },
    deleteMenuItem: async (itemId: string) => {
      const response = await fetch(`${API_URL}/admin/menu/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },

    // Loyalty management
    getLoyaltyCards: async () => {
      const response = await fetch(`${API_URL}/admin/loyalty/cards`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    createLoyaltyCard: async (cardData: any) => {
      const response = await fetch(`${API_URL}/admin/loyalty/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify(cardData),
      });
      return handleResponse(response);
    },
    updateLoyaltyCard: async (cardId: string, cardData: any) => {
      const response = await fetch(`${API_URL}/admin/loyalty/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify(cardData),
      });
      return handleResponse(response);
    },
    getGifts: async () => {
      const response = await fetch(`${API_URL}/admin/loyalty/gifts`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    createGift: async (formData: FormData) => {
      const response = await fetch(`${API_URL}/admin/loyalty/gifts`, {
        method: "POST",
        headers: {
          "x-auth-token": getToken() || "",
        },
        body: formData,
      });
      return handleResponse(response);
    },
    updateGift: async (giftId: string, formData: FormData) => {
      const response = await fetch(`${API_URL}/admin/loyalty/gifts/${giftId}`, {
        method: "PUT",
        headers: {
          "x-auth-token": getToken() || "",
        },
        body: formData,
      });
      return handleResponse(response);
    },

    // User management
    getUsers: async () => {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    getUserDetails: async (userId: string) => {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        headers: {
          "x-auth-token": getToken() || "",
        },
      });
      return handleResponse(response);
    },
    updateUser: async (userId: string, userData: any) => {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    addCoinsToUser: async (
      userId: string,
      amount: number,
      description?: string,
    ) => {
      const response = await fetch(`${API_URL}/admin/users/${userId}/coins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken() || "",
        },
        body: JSON.stringify({ amount, description }),
      });
      return handleResponse(response);
    },
    assignLoyaltyCard: async (
      userId: string,
      cardId: string,
      stamps?: number,
    ) => {
      const response = await fetch(
        `${API_URL}/admin/users/${userId}/loyalty-cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken() || "",
          },
          body: JSON.stringify({ card_id: cardId, stamps }),
        },
      );
      return handleResponse(response);
    },
  },
};

export default api;
