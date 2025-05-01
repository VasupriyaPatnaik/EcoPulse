export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">EcoPulse</h3>
          <p className="text-green-200">
            Making sustainability measurable, rewarding, and fun.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-green-200 hover:text-white">About</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Features</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-green-200 hover:text-white text-xl">Twitter</a>
            <a href="#" className="text-green-200 hover:text-white text-xl">Instagram</a>
            <a href="#" className="text-green-200 hover:text-white text-xl">Facebook</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-green-700 text-center text-green-300">
        © {new Date().getFullYear()} EcoPulse. All rights reserved.
      </div>
    </footer>
  );
}