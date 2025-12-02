import React from 'react';

export default function HookCard({ text, onCopy, onSave }) {
  return (
    <div className="p-3 border rounded flex justify-between items-center">
      <div className="flex-1 pr-4">{text}</div>
      <div className="flex gap-2">
        <button onClick={() => onCopy(text)} className="text-sm text-blue-600">Copy</button>
        <button onClick={() => onSave(text)} className="text-sm">Save</button>
      </div>
    </div>
  );
}
