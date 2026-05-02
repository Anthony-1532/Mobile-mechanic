import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../src/app";

const app = buildApp();

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("api", () => {
  it("books service and auto-generates reminders", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/bookings",
      payload: {
        customerName: "Jane Doe",
        vehicle: "2018 Honda Civic",
        issue: "Vehicle does not start consistently",
        priority: "urgent",
        location: "home",
        scheduledAt: new Date().toISOString()
      }
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().reminders.length).toBe(2);
  });

  it("creates DVI and invoice", async () => {
    const booking = await app.inject({
      method: "POST",
      url: "/bookings",
      payload: {
        customerName: "John Doe",
        vehicle: "Ford Transit",
        issue: "Brake noise during deceleration at low speed",
        priority: "standard",
        location: "work",
        scheduledAt: new Date(Date.now() + 3600000).toISOString()
      }
    });

    const requestId = booking.json().booking.id;

    const dvi = await app.inject({
      method: "POST",
      url: "/inspections",
      payload: {
        requestId,
        findings: "Front pads below safe threshold and rotor scoring observed.",
        technician: "Alex Tech",
        media: [{ type: "photo", url: "https://example.com/photo.jpg", note: "Pad wear" }]
      }
    });
    expect(dvi.statusCode).toBe(201);

    const invoice = await app.inject({ method: "POST", url: "/invoices", payload: { requestId, amount: 289.99 } });
    expect(invoice.statusCode).toBe(201);
    expect(invoice.json().paymentMethods).toContain("apple_pay");
  });
});
