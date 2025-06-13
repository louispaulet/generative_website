import { useState } from "react";
import Cookies from "js-cookie";
import getOpenAIClient from "../openaiClient";

export default function PageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const apiKey = Cookies.get("openai_api_key") || "";
      // If user provided an API key, call OpenAI directly to avoid extra round-trip
      if (apiKey) {
        const openai = getOpenAIClient();
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4.1-nano-2025-04-14",
            messages: [
              {
                role: "user",
                content: `You are a browser. You have the knowledge of the whole compressed internet in yourself. You only answer in raw HTML that will be directly displayed. 
Take the following user request, or url, and display the requested URL page.  
### USER REQUEST
${prompt}`,
              },
            ],
          });
          setContent(completion.choices?.[0]?.message?.content || "");
        } catch (err) {
          console.error(err);
          setContent(
            "<p class='text-red-500'>OpenAI request failed. Please try again.</p>"
          );
        }
      } else {
        // Fallback to server-side generation (uses default key)
        const resp = await fetch(
          `/generate?link_text=${encodeURIComponent(prompt)}`
        );
        const text = await resp.text();
        setContent(text);
      }
    } catch {
      setContent("<p class='text-red-500'>Failed to generate page.</p>");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {content && (
        <div
          className="mt-6 border rounded p-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
