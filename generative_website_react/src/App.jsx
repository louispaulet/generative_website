import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Tos from "./pages/Tos";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tos" element={<Tos />} />
            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="max-w-5xl mx-auto px-4 py-12">
                  <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
                  <p className="text-gray-700">
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
