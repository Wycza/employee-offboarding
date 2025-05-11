export interface OffboardEmployeeQuery {
  id: string;
  address: {
    city: string;
    streetLine: string;
    country: string;
    postalCode: string;
    receiver: string;
  };
  notes: string | null;
  phone: string;
  email: string;
}
