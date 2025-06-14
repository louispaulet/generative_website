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
          // Expect a JSON object: { html: "...", css: "..." }
          const HtmlCssWrap = z.object({
            html: z.string(),
            css: z.string(),
          });
          const response = await openai.responses.parse({
            model: "gpt-4.1-nano-2025-04-14",
            input: [
              {
                role: "system",
                content:
                  'You are a browser. You have the knowledge of the whole compressed internet in yourself. You only answer with a JSON object: { "html": "<RAW_HTML>", "css": "<RAW_CSS>" }. The HTML must use a few invented CSS classes, and the CSS must define those classes. You must ALWAYS return both "html" and "css" keys, even if the user prompt does not mention CSS. Never return only HTML. Do not include any explanations or extra text. Only output the JSON object.',
              },
              { role: "user", content: prompt },
            ],
            text: {
              format: zodTextFormat(HtmlCssWrap, "htmlCssWrap"),
            },
          });
          let { html, css } = response.output_parsed;
          // Fallback: if CSS is missing or empty, provide a minimal default
          if (!css || typeof css !== "string" || !css.trim()) {
            css = "body{font-family:sans-serif;}";
          }
          // Inject CSS into HTML for iframe display
          const htmlWithCss = `<style>${css}</style>` + html;
          // For debugging: store both raw and sanitized
          window.__GEN_RAW_IFRAME__ = htmlWithCss;
          window.__GEN_SANITIZED_IFRAME__ = DOMPurify.sanitize(htmlWithCss, { ADD_TAGS: ["style"] });
          setContent(htmlWithCss); // No sanitization for iframe content
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
        // Try to parse as JSON object { html, css }
        let htmlWithCss = "";
        try {
          const obj = JSON.parse(text);
          if (
            obj &&
            typeof obj === "object" &&
            typeof obj.html === "string"
          ) {
            // Fallback: if CSS is missing or empty, provide a minimal default
            let css = typeof obj.css === "string" && obj.css.trim() ? obj.css : "body{font-family:sans-serif;}";
            htmlWithCss = `<style>${css}</style>` + obj.html;
          } else if (
            Array.isArray(obj) &&
            obj.length === 2 &&
            typeof obj[0] === "string" &&
            typeof obj[1] === "string"
          ) {
            // Legacy: handle [html, css] array
            htmlWithCss = `<style>${obj[1]}</style>` + obj[0];
          } else {
            htmlWithCss = text;
          }
        } catch {
          htmlWithCss = text;
        }
        // For debugging: store both raw and sanitized
        window.__GEN_RAW_IFRAME__ = htmlWithCss;
        window.__GEN_SANITIZED_IFRAME__ = DOMPurify.sanitize(htmlWithCss, { ADD_TAGS: ["style"] });
        setContent(htmlWithCss); // No sanitization for iframe content
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
