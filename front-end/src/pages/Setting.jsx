import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPopup({ close, save }) {
  const [settings, setSettings] = useState({
    language: "English",
    tone: "Fast",
    genre: "Horror",
    length: "Short",
    autoCopy: false,
  });

  function update(e) {
    const { name, value, type, checked } = e.target;
    setSettings((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function applySettings() {
    save(settings);
    close();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-slate-900 text-black dark:text-white w-96 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        {/* Default Language */}
        <label className="block text-sm font-medium mb-1">Default Language</label>
        <select
          name="language"
          value={settings.language}
          onChange={update}
          className="w-full p-2 mb-4 bg-slate-100 dark:bg-slate-800 rounded-md"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>

        {/* Default Tone */}
        <label className="block text-sm font-medium mb-1">Default Tone</label>
        <select
          name="tone"
          value={settings.tone}
          onChange={update}
          className="w-full p-2 mb-4 bg-slate-100 dark:bg-slate-800 rounded-md"
        >
          <option>Fast</option>
          <option>Emotional</option>
          <option>Dark</option>
          <option>Funny</option>
          <option>Serious</option>
        </select>

        {/* Default Genre */}
        <label className="block text-sm font-medium mb-1">Default Genre</label>
        <select
          name="genre"
          value={settings.genre}
          onChange={update}
          className="w-full p-2 mb-4 bg-slate-100 dark:bg-slate-800 rounded-md"
        >
          <option>Horror</option>
          <option>Comedy</option>
          <option>Motivation</option>
          <option>Mystery</option>
          <option>History</option>
        </select>

        {/* Output Length */}
        <label className="block text-sm font-medium mb-1">Output Length</label>
        <select
          name="length"
          value={settings.length}
          onChange={update}
          className="w-full p-2 mb-4 bg-slate-100 dark:bg-slate-800 rounded-md"
        >
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>

        {/* Auto-Copy */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="autoCopy"
            checked={settings.autoCopy}
            onChange={update}
          />
          <label className="text-sm font-medium">Auto-Copy After Generation</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={close}
            className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={applySettings}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
