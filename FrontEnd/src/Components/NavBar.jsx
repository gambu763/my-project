import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-black bg-[#FAF3E8] px-4 sm:px-6 py-3 sm:py-4">
      <Link
        to="/"
        className="inline-block bg-[#FAF3E8] text-sm sm:text-base text-black font-medium no-underline hover:no-underline px-3 py-1 border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        style={{ textDecoration: "none" }}
      >
        Submit Application
      </Link>
    </nav>
  );
}
