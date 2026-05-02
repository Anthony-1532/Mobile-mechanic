import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  healthMessage,
  type ServiceRequest,
  type Reminder,
  type DigitalVehicleInspection,
  type Invoice
} from "@mobile-mechanic/shared";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2),
  vehicle: z.string().min(2),
  issue: z.string().min(10),
  priority: z.enum(["standard", "urgent"]),
  location: z.enum(["home", "work"]),
  scheduledAt: z.string().datetime()
});

const inspectionSchema = z.object({
  requestId: z.string().min(1),
  findings: z.string().min(10),
  media: z.array(z.object({ type: z.enum(["photo", "video"]), url: z.string().url(), note: z.string().min(2) })),
  technician: z.string().min(2)
});

export const buildApp = () => {
  const app = Fastify({ logger: false });
  const requests: ServiceRequest[] = [];
  const reminders: Reminder[] = [];
  const inspections: DigitalVehicleInspection[] = [];
  const invoices: Invoice[] = [];

  app.register(cors, { origin: true });

  app.get("/health", async () => ({ status: "ok", message: healthMessage }));

  app.post("/bookings", async (req, reply) => {
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const booking: ServiceRequest = { id: crypto.randomUUID(), ...parsed.data };
    requests.push(booking);

    reminders.push(
      { requestId: booking.id, channel: "sms", scheduledFor: booking.scheduledAt },
      { requestId: booking.id, channel: "email", scheduledFor: booking.scheduledAt }
    );

    return reply.status(201).send({ booking, reminders: reminders.filter((r) => r.requestId === booking.id) });
  });

  app.get("/schedule/optimized-route", async () => ({
    message: "Route optimization placeholder",
    sequence: requests
      .slice()
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      .map((r) => ({ id: r.id, location: r.location, scheduledAt: r.scheduledAt }))
  }));

  app.get("/calendar/sync-options", async () => ({ providers: ["google", "outlook"] }));

  app.post("/inspections", async (req, reply) => {
    const parsed = inspectionSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });
    const dvi: DigitalVehicleInspection = { id: crypto.randomUUID(), ...parsed.data };
    inspections.push(dvi);
    return reply.status(201).send(dvi);
  });

  app.get("/customer-portal/:customerName", async (req) => {
    const customerName = (req.params as { customerName: string }).customerName;
    const customerBookings = requests.filter((r) => r.customerName.toLowerCase() === customerName.toLowerCase());
    return { customerName, bookings: customerBookings, inspections, invoices };
  });

  app.post("/invoices", async (req, reply) => {
    const payload = req.body as { requestId: string; amount: number };
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      requestId: payload.requestId,
      amount: payload.amount,
      status: "issued",
      paymentMethods: ["card", "apple_pay", "google_pay"]
    };
    invoices.push(invoice);
    return reply.status(201).send(invoice);
  });

  app.get("/inventory", async () => ({
    truckStock: [
      { sku: "BRAKE-PAD-01", qty: 6, reorderPoint: 4 },
      { sku: "OIL-5W30", qty: 12, reorderPoint: 5 }
    ],
    autoUpdate: "enabled"
  }));

  app.get("/operations/toolkit", async () => ({
    offlineMode: "supported-with-sync",
    messaging: ["sms", "whatsapp"],
    laborGuides: "enabled",
    mileageExpenseTracking: "irs-compliant"
  }));

  return app;
};
