import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import getOpenAIClient from "../openaiClient";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import DOMPurify from "dompurify";

export default function PageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (loading) return;
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
          setContent(DOMPurify.sanitize(htmlArray?.[0] ?? ""));
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
<div className="mx-auto mt-8 space-y-2 max-w-full sm:w-[50vw] px-1 sm:px-0" style={{ width: "100vw" }}>
      <div className="win95-toolbar">
        <input
          type="text"
          className="win95-input bg-white text-black placeholder-gray-700"
          placeholder="Enter a prompt"
          disabled={loading}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              e.preventDefault();
              handleGenerate();
            }
          }}
        />
        <button
          onClick={handleGenerate}
          className="win95-button"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div
        className="crt w-full"
        style={{ aspectRatio: "4 / 3", minHeight: "600px" }}
      >
        <iframe
          title="generated-content"
          className="w-full h-full rounded-none"
          srcDoc={content || ""}
        />
      </div>
      <div className="win95-taskbar w-full">
        <span className="win95-start">Start</span>
        <span className="flex-grow" />
        <span className="win95-clock">
          {currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-left text-xs text-gray-600">
        <strong>What is Generative Browsing?</strong>
        <br />
        Every time you enter a prompt, <span className="font-semibold">gpt4.1-nano</span>—a lightning-fast, affordable large language model—conjures a unique HTML page for you in real time. This is the "dead internet": a latent space where content is ephemeral, personal, and exists only as long as you need it. <br />
        <br />
        <span className="font-semibold">Why gpt4.1-nano?</span> Its speed and low cost make it ideal for generating the invisible tokens (HTML tags and markup) that power the web, enabling a seamless, scalable, and democratized creative experience for all.
      </div>
    </div>
  );
}
