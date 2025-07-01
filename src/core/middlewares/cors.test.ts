import { options } from "./cors";
import { describe, expect, it } from "@jest/globals";

describe("CORS configuration", () => {
    const originFn: any = options.origin;

    it("should allow requests with no origin (same-origin requests)", (done) => {
        originFn(undefined, (err, allowed) => {
            expect(err).toBeNull();
            expect(allowed).toBe(true);
            done();
        });
    });

    it("should allow requests from allowed origins", (done) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "http://localhost:4000",
        ];

        allowedOrigins.forEach((origin) => {
            originFn(origin, (err, allowed) => {
                expect(err).toBeNull();
                expect(allowed).toBe(true);
            });
        });

        done();
    });

    it("should reject requests from not allowed origins", (done) => {
        const disallowedOrigins = [
            "http://malicious.com",
            "http://example.com",
        ];

        disallowedOrigins.forEach((origin) => {
            originFn(origin, (err, allowed) => {
                expect(err).toBeInstanceOf(Error);
                expect(err?.message).toBe("Origin not allowed by CORS");
                expect(allowed).toBeUndefined();
            });
        });

        done();
    });
});
