export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MySite. All rights reserved.
      </div>
    </footer>
  );
}
