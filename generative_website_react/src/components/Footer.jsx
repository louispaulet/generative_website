export default function Footer() {
  return (
    <footer className="win95-window py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <span role="img" aria-label="logo">🌐</span> GenWeb. All rights reserved.
      </div>
    </footer>
  );
}
