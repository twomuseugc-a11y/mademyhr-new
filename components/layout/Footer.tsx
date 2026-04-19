export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 text-xs mt-10 relative">
      <div className="absolute bottom-4 right-4">
        <a href="/login" className="text-xs text-gray-400 hover:text-white transition">
          Admin Login
        </a>
      </div>
      © {new Date().getFullYear()} madebyhr
    </footer>
  );
}
