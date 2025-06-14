export default function Footer() {
  return (
    <footer className="win95-window py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <img src="/retro_browser_logo.webp" alt="logo" className="inline w-4 h-4 align-text-bottom" /> GenWeb. All rights reserved.
      </div>
    </footer>
  );
}
