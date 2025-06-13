import { useState } from "react";

export default function PageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(`/generate?link_text=${encodeURIComponent(prompt)}`);
      const text = await resp.text();
      setContent(text);
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
