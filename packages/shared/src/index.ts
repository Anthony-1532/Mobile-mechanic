export type ServiceRequest = {
  id: string;
  customerName: string;
  vehicle: string;
  issue: string;
  priority: "standard" | "urgent";
  location: "home" | "work";
  scheduledAt: string;
};

export type Reminder = {
  requestId: string;
  channel: "sms" | "email";
  scheduledFor: string;
};

export type InspectionMedia = {
  type: "photo" | "video";
  url: string;
  note: string;
};

export type DigitalVehicleInspection = {
  id: string;
  requestId: string;
  findings: string;
  media: InspectionMedia[];
  technician: string;
};

export type Invoice = {
  id: string;
  requestId: string;
  amount: number;
  status: "draft" | "issued" | "paid";
  paymentMethods: Array<"card" | "apple_pay" | "google_pay">;
};

export const healthMessage = "Mobile Mechanic API is healthy";
