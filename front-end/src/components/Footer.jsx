import React from 'react';
export default function Footer(){ 
  return (
    <footer className="bg-gradient-to-b from-[#0a1a33] via-[#0f3d63] to-[#146b9e] text-sm text-white py-6">
      <div className="container mx-auto px-6 text-center">© {new Date().getFullYear()} ReelHookPro — Built for creators</div>
    </footer>
  );
}
