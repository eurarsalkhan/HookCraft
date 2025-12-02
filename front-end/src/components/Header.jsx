import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfilePopup from "../pages/ProfilePopup";
import logo from "../pages/logo.png"; // adjust path if needed



export default function Header({ user, logout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);
  // const hideProfilePages = ["/login", "/signup", "/Pricing"];
  // const hideProfile = hideProfilePages.includes(currentPath);
  const currentPath = location.pathname;
  const hideProfile = currentPath === "/login" || currentPath === "/signup"  || currentPath == "/pricing" || currentPath == "/features" || currentPath == "/privacy" || currentPath == "/customers" || currentPath == "/terms" || currentPath== "/contact" || currentPath == "/forgotpassword" || currentPath == "/resetpassword";
  
  const avatarLetter = user?.email?.charAt(0)?.toUpperCase() || "U";

  function BrandLogo({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="logo.png"
      aria-hidden
    >
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <path d="M7 12c1.5-2 4-3 6-3s4.5 1 6 3c-.5 2-3 4-6 4s-5.5-2-6-4z" fill="white" opacity="0.95" />
    </svg>
  );
}



  return (
    <header className="bg-gradient-to-b from-[#0f5adb] via-[#042d51] to-[#03283d] text-white">
          
          
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          {/* <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <BrandLogo size={18} />
          </div>  */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
            <img
              src={logo}
              alt="Profile Logo"
              className="w-full h-full object-cover"
            />
          </div>
          
          <Link  className="text-xl font-bold">
            <span className="text-green-500 font-extrabold">Hook</span>
            <span className="text-white font-semibold ">Craft</span>         
             </Link>
          
         {/* Page-based Navigation
          {currentPath === "/generator" && (
            <nav className="hidden md:flex gap-4 text-sm text-gray-300">
              <Link to="/history" className="hover:text-white">History</Link>
            </nav>
            
          )} */}
        

          {/* {currentPath === "/history" && (
            <nav className="hidden md:flex gap-4 text-sm text-gray-300">
              <Link to="/generator" className="hover:text-white">Generator</Link>
            </nav>
          )} */}
        </div>
            {user?.role === "admin" && 
 (currentPath.startsWith("/admin") || currentPath.startsWith("/generator")) && (
  <li>
    <a href="/admin">Admin Dashboard</a>
  </li>
)}
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* If NOT Logged In → Landing Navigation */}
          {/* {!user && currentPath === "/" && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-white">
              <Link to="/HookCard" className="hover:text-slate-200">Features</Link>
              <Link to="/Pricing" className="hover:text-slate-200">Pricing</Link>
              <Link to="#testimonials" className="hover:text-slate-200">Customers</Link>
              <Link to="/login" className="bg-emerald-600 px-4 py-2 rounded-md">Sign in</Link>
              <Link to="/signup" className="bg-emerald-600 px-4 py-2 rounded-md">Get started</Link>
            </nav>
          )} */}

          {/* Logged In → Show Profile Avatar (but NOT on login/signup page) */}
          {user && !hideProfile && (
            <button onClick={() => setOpenPopup(true)} className="flex items-center">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="profile"
                  className="w-10 h-10 rounded-full border shadow-sm object-cover 
                             transition-all duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center 
                                justify-center font-bold text-lg shadow-sm hover:scale-105 transition">
                  {avatarLetter}
                </div>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Profile Popup */}
      {openPopup && (
        <ProfilePopup
          close={() => setOpenPopup(false)}
          user={user}
          logout={logout}
        />
      )}
    </header>
  );
}
