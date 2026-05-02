import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { buildApp } from "../src/app";

const app = buildApp();

beforeAll(async () => app.ready());
afterAll(async () => app.close());

describe("api stability", () => {
  it("handles concurrent bookings across several burst instances", async () => {
    const bursts = Array.from({ length: 3 }, (_, batch) =>
      Promise.all(
        Array.from({ length: 25 }, (_, i) =>
          app.inject({
            method: "POST",
            url: "/bookings",
            payload: {
              customerName: `Customer ${batch}-${i}`,
              vehicle: "Ford Transit",
              issue: "Engine warning light remains active after restart",
              priority: i % 2 === 0 ? "standard" : "urgent",
              location: i % 2 === 0 ? "home" : "work",
              scheduledAt: new Date(Date.now() + i * 60000).toISOString()
            }
          })
        )
      )
    );

    const results = (await Promise.all(bursts)).flat();
    expect(results.every((res) => res.statusCode === 201)).toBe(true);
  });
});
