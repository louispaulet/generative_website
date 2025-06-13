import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "openai_api_key";

export default function ApiKeySetup({ className = "" }) {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  // Load the key from cookies on first mount
  useEffect(() => {
    const existingKey = Cookies.get(COOKIE_NAME) || "";
    if (existingKey) {
      setApiKey(existingKey);
      setSaved(true);
    }
  }, []);

  const saveKey = () => {
    if (!apiKey) return;
    // Persist the key for 30 days
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
      className={`w-full max-w-xl mx-auto bg-gray-50 border border-gray-200 p-6 rounded-lg shadow ${className}`}
    >
      {!saved ? (
        <>
          <h3 className="text-xl font-semibold mb-2">
            Enter your OpenAI API key
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Your key will be stored locally in a cookie so you don’t have to
            re-enter it. It never leaves your browser.
          </p>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value.trim())}
          />
          <button
            onClick={saveKey}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={!apiKey}
          >
            Save API Key
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">
            API Key saved (
            {apiKey ? `${apiKey.slice(0, 8)}…` : ""}
            )
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            You can now generate pages using your OpenAI account.
          </p>
          <button
            onClick={resetKey}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Remove / Change API Key
          </button>
        </>
      )}
    </div>
  );
}
