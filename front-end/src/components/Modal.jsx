import React from 'react';
export default function Modal({ children, open, onClose }) {
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-lg">
        <div className="flex justify-end"><button onClick={onClose}>✕</button></div>
        {children}
      </div>
    </div>
  );
}
