declare module '#auth-utils' {
  interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};
