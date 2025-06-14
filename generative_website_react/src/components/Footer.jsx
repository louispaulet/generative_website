export default function Footer() {
  return (
    <footer className="win95-window py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <img src="/retro_browser_logo.webp" alt="logo" className="inline w-4 h-4 align-text-bottom" /> GenWeb. All rights reserved.
        <div className="mt-2 text-xs text-gray-400">
          <span>
            Generative Website is an experiment in generative web browsing and latent space creativity.<br />
            Powered by gpt4.1-nano for fast, affordable, and invisible-token web generation.<br />
            <a href="https://github.com/louispaulet/generative_website" className="underline hover:text-blue-500" target="_blank" rel="noopener noreferrer">
              Learn more about the vision &rarr;
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
