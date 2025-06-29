import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import getOpenAIClient from "../openaiClient";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import DOMPurify from "dompurify";

const demoPrompts = [
  `imagine a youtube landing page in a world where videos have a smell : what would it look like ? imagine the disgustings trends of clickbait smell o vision videos -- please use emojis instead of images`,
  "display a fake windows xp interface",
  "make a fake overly complex interface to declare taxes",
  "Weird invitation to a gender reveal party in the sewers. Mention in big 'Gender Reveal Party Down The Drain'"
];

export default function PageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Ref for the input field
  const inputRef = useRef(null);

  // History state
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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
                  'You are a browser. You have the knowledge of the whole compressed internet in yourself. You only answer with a JSON object: { "html": "<RAW_HTML>", "css": "<RAW_CSS>" }. The HTML must use a few invented CSS classes, and the CSS must define those classes. You must ALWAYS return both "html" and "css" keys, even if the user prompt does not mention CSS. Never return only HTML. Do not include any explanations or extra text. Only output the JSON object. The minimum number of tokens to generate is 1024. If the user prompt is too short, expand the content with relevant, creative, and visually interesting HTML and CSS until the output reaches at least 1024 tokens. Your outputs will be stored forever to be critisized by UI/UX people, so do your best!',
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
          // Update history
          setHistory((prev) => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(htmlWithCss);
            return newHistory;
          });
          setHistoryIndex((prev) => prev + 1);
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
        // Update history
        setHistory((prev) => {
          const newHistory = prev.slice(0, historyIndex + 1);
          newHistory.push(htmlWithCss);
          return newHistory;
        });
        setHistoryIndex((prev) => prev + 1);
      }
    } catch {
      setContent("<p class='text-red-500'>Failed to generate page.</p>");
    } finally {
      setLoading(false);
      // Refocus the input after generation
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Navigation handlers
  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setContent(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setContent(history[historyIndex + 1]);
    }
  };

  // Effect: when prompt is set to any demo prompt, trigger handleGenerate
  useEffect(() => {
    if (demoPrompts.includes(prompt)) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return (
    <div className="mx-auto mt-8 space-y-2 max-w-full sm:w-[50vw] px-1 sm:px-0" style={{ width: "100vw" }}>
      <div className="win95-toolbar flex flex-row items-center gap-2">
        <button
          className="win95-button px-2"
          onClick={handleBack}
          disabled={historyIndex <= 0}
          aria-label="Back"
        >
          ←
        </button>
        <button
          className="win95-button px-2"
          onClick={handleForward}
          disabled={historyIndex >= history.length - 1}
          aria-label="Forward"
        >
          →
        </button>
        <input
          ref={inputRef}
          type="text"
          className="win95-input bg-white text-black placeholder-gray-700 flex-1"
          placeholder="Enter a prompt"
          
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          style={{ minWidth: 0 }}
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
        <button
          className="win95-start"
          onClick={() => {
            // Pick a random prompt from the list
            const randomPrompt = demoPrompts[Math.floor(Math.random() * demoPrompts.length)];
            setPrompt(randomPrompt);
          }}
        >
          Start
        </button>
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
      <div className="mt-2 text-xs italic text-gray-700 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
        Tip: click the <span className="font-semibold">start</span> button to try a random prompt!
      </div>
    </div>
  );
}
