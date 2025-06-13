import OpenAI from "openai";
import Cookies from "js-cookie";

/**
 * Returns an OpenAI client configured with the API key stored in cookies.
 * If the key is missing, it returns null so callers can handle that case.
 */
export default function getOpenAIClient() {
  const apiKey = Cookies.get("openai_api_key");
  if (!apiKey) return null;

  return new OpenAI({
    apiKey,
    // Explicitly opt-in to running the OpenAI SDK in the browser.
    dangerouslyAllowBrowser: true,
  });
}
