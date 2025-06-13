import { useState } from "react";
import Cookies from "js-cookie";
import getOpenAIClient from "../openaiClient";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

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
          const HtmlWrap = z.object({
            html: z.array(z.string()),
          });
          const response = await openai.responses.parse({
            model: "gpt-4.1-nano-2025-04-14",
            input: [
              {
                role: "system",
                content:
                  'You are a browser. You have the knowledge of the whole compressed internet in yourself. You only answer with a JSON object {"html": ["<RAW_HTML>"]} where the "html" key holds an array with a single string containing the raw HTML to be directly displayed.',
              },
              { role: "user", content: prompt },
            ],
            text: {
              format: zodTextFormat(HtmlWrap, "htmlWrap"),
            },
          });
          const htmlArray = response.output_parsed.html;
          setContent(htmlArray?.[0] ?? "");
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
        <iframe
          title="generated-content"
          className="mt-6 border rounded w-1/2 mx-auto"
          style={{ height: "50vh" }}
          srcDoc={content}
        />
      )}
    </div>
  );
}
