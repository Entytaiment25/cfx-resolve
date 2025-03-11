/**
 * Resolves a CFX.re URL to its IP address
 * @param url CFX server URL or join code
 * @returns Promise containing the resolved IP or error message
 */
export async function resolveCfxReIp(url: string): Promise<string> {
	const normalizedUrl: string = normalizeCfxReUrl(url);

	try {
		const response = await fetch(normalizedUrl);
		const citizenFxUrl = response.headers.get("x-citizenfx-url");

		if (!citizenFxUrl) {
			throw new Error("x-citizenfx-url header not found");
		}

		return citizenFxUrl.replace(/^http:\/\/|\/$/g, "");
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return `Error: ${errorMessage}`;
	}
}

/**
 * Normalizes a CFX.re URL to the proper format
 * @param url The user input URL
 * @returns Properly formatted request URL
 */
function normalizeCfxReUrl(url: string): string {
	if (url.startsWith("cfx.re/join/")) {
		return `https://${url}`;
	}
	if (url.startsWith("https://cfx.re/join/")) {
		return url;
	}
	return `https://cfx.re/join/${url}`;
}
