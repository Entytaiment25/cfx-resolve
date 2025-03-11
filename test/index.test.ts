import { expect, test } from "bun:test";
import { resolveCfxReIp } from "../src/index";

test("resolveCfxReIp should return the resolved IP address", async () => {
	const mockUrl = "cfx.re/join/mockServer";
	const mockResponse = new Response(null, {
		headers: { "x-citizenfx-url": "http://127.0.0.1:30120" },
	});

	globalThis.fetch = async () => mockResponse;

	const result = await resolveCfxReIp(mockUrl);
	expect(result).toBe("127.0.0.1:30120");
});

test("resolveCfxReIp should return an error message if x-citizenfx-url header is not found", async () => {
	const mockUrl = "cfx.re/join/mockServer";
	const mockResponse = new Response(null, { headers: {} });

	globalThis.fetch = async () => mockResponse;

	const result = await resolveCfxReIp(mockUrl);
	expect(result).toBe("Error: x-citizenfx-url header not found");
});

test("resolveCfxReIp should return an error message if fetch fails", async () => {
	const mockUrl = "cfx.re/join/mockServer";
	const mockError = new Error("Network error");

	globalThis.fetch = async () => {
		throw mockError;
	};

	const result = await resolveCfxReIp(mockUrl);
	expect(result).toBe("Error: Network error");
});
