import { jest, describe, expect, it } from "@jest/globals";
import helmet from "helmet";
import { security } from "./security";

jest.mock("helmet");

describe("Helmet security configuration", () => {
  it("should configure helmet with the correct options", () => {
    expect(security).toHaveBeenCalledWith({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: true,
      crossOriginResourcePolicy: { policy: "same-origin" },
      referrerPolicy: { policy: "no-referrer" },
    });
  });
});
