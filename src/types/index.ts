export interface User {
  userId: string;
  username: string;
  role: 'admin' | 'staff';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservationId: string;
}

export interface Reservation {
  id: string;
  flightNumber: string;
  date: string;
  customers: Customer[];
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AiData {
  reservationId: string;
  aiComments: string[];
  aiSuggestions: string[];
  summary: string;
  generatedAt: string;
}

export interface ReservationWithAI extends Reservation {
  aiData: AiData | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
} 