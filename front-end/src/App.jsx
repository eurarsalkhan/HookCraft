// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Generator from './pages/Generator';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Account from './pages/Account';
// import Billing from './pages/Billing';
// import History from './pages/History';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import Pricing from './pages/Pricing';
// import ProfilePopup from './pages/ProfilePopup';
// import { useAuth } from './utils/useAuth';



// export default function App() {
//   const { user, loading } = useAuth();
  

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header user={user} />
//       <main className="flex-1 container mx-auto p-6">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/generator" element={<Generator />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/account" element={<Account />} />
//           <Route path="/billing" element={<Billing />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/pricing" element={<Pricing />} />
//           <Route path="/profilepopup" element={<ProfilePopup />} />
//           <Route path="/generator" element={<ProtectedRoute user={user}><Generator /></ProtectedRoute>}/>
  
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import './index.css'; 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Billing from './pages/Billing';
import History from './pages/History';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Features from './pages/Features';
import Customers from './pages/Customers';
import Pricing1 from './pages/Pricing1';
import ResetPassword from './pages/ResetPassword';
import Sample from './pages/Sample';
import Setting from './pages/Setting';
import ProfilePopup from './pages/ProfilePopup';
import ProtectedRoute from './utils/ProtectedRoute';
import { useAuth } from './utils/useAuth';
import ForgotPassword from './pages/ForgotPassword';
import { useNavigate } from 'react-router-dom';



export default function App() {
  const { user, loading } = useAuth();


  // if (loading) return <p>Loading...</p>;
  if (loading)
  return (
    <div className="bounce-loader">
      <div></div><div></div><div></div>
    </div>
  );

  return (
    
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-6 min-h-screen">
        <Routes>
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/features" element={<Features />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sample" element={<Sample />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing1" element={<Pricing1 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword/>} />

          <Route
            path="/setting"
            element={
              <Setting
                close={() => window.history.back()}
                save={(val) => {
                  localStorage.setItem("hook_settings", JSON.stringify(val));
                  window.history.back();
                }}
              />
            }
          />


          <Route path="/profilepopup" element={<ProfilePopup />} />


          {/* Protected Routes */}
          <Route path="/generator" element={
            <ProtectedRoute user={user}>
              <Generator />
            </ProtectedRoute>
          } />

          <Route path="/account" element={
            <ProtectedRoute user={user}>
              <Account />
            </ProtectedRoute>
          } />

          <Route path="/billing" element={
            <ProtectedRoute user={user}>
              <Billing />
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute user={user}>
              <History />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute user={user} adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/" element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
