import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "openai_api_key";

/**
 * A slim horizontal status/entry bar for managing the OpenAI API key.
 * Stays visually modern while occupying minimal vertical space.
 */
export default function ApiKeySetup({ className = "" }) {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  // On mount, load any key stored in cookies
  useEffect(() => {
    const existingKey = Cookies.get(COOKIE_NAME) || "";
    if (existingKey) {
      setApiKey(existingKey);
      setSaved(true);
    }
  }, []);

  const saveKey = () => {
    if (!apiKey) return;
    // Persist for 30 days
    Cookies.set(COOKIE_NAME, apiKey, { expires: 30 });
    setSaved(true);
  };

  const resetKey = () => {
    Cookies.remove(COOKIE_NAME);
    setApiKey("");
    setSaved(false);
  };

  return (
    <div
      className={`w-full max-w-3xl mx-auto flex items-center gap-4 px-4 py-2 border border-gray-300 rounded-md shadow bg-white/80 backdrop-blur ${className}`}
    >
      {saved ? (
        <>
          <span className="text-sm sm:text-base font-medium whitespace-nowrap">
            API Key saved ({apiKey ? `${apiKey.slice(0, 8)}…` : ""})
          </span>
          <button
            onClick={resetKey}
            className="ml-auto bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded transition"
          >
            Remove / Change
          </button>
        </>
      ) : (
        <>
          <input
            type="password"
            className="flex-grow text-sm sm:text-base bg-transparent border-none focus:outline-none placeholder-gray-500"
            placeholder="Enter OpenAI API key (sk-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value.trim())}
          />
          <button
            onClick={saveKey}
            disabled={!apiKey}
            className="ml-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded transition"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}
