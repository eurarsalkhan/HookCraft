import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import HookCard from "../components/HookCard";
import Loader from "../components/Loader";
import { Api } from "../lib/api";
import { Link } from "react-router-dom";
import { GENRES, TONES, LANGUAGES } from "../lib/constants";
import Setting from "../pages/Setting"; // <-- you forgot this import

const REACTIONS = ["Curiosity", "Shock", "Fear", "Surprise", "Emotion", "Mystery"];

const SAMPLE_PRESETS = [
  {
    id: "fatloss-quick",
    title: "Fat loss — Quick Wins",
    form: {
      niche: "Fitness",
      topic: "fat loss mistakes",
      tone: "fast",
      genre: "Motivation",
      conflict: "problem",
      reaction: "Curiosity",
      language: "English",
      hookType: "Curiosity",
      length: "Short",
      count: 6,
    },
  },
  {
    id: "tech-viral",
    title: "Tech — Viral Teaser",
    form: {
      niche: "Tech",
      topic: "AI prompt hacks",
      tone: "suspense",
      genre: "Sci-fi",
      conflict: "goal",
      reaction: "Surprise",
      language: "English",
      hookType: "Question",
      length: "Short",
      count: 5,
    },
  },
  {
    id: "history-hook",
    title: "History — Surprise Fact",
    form: {
      niche: "History",
      topic: "weird ancient laws",
      tone: "deep",
      genre: "History",
      conflict: "problem",
      reaction: "Shock",
      language: "English",
      hookType: "Story",
      length: "Short",
      count: 4,
    },
  },
];

export default function GeneratorDashboard() {
  const [showSettings, setShowSettings] = useState(false);

  const savedSettings =
    JSON.parse(localStorage.getItem("hook_settings")) || {
      language: "English",
      tone: "fast",
      genre: "Horror",
      length: "Short",
      autoCopy: false,
    };

  const [form, setForm] = useState({
    niche: "",
    topic: "",
    tone: savedSettings.tone,
    audience: "",
    hookType: "Question",
    length: savedSettings.length,
    count: 5,
    genre: savedSettings.genre,
    conflict: "problem",
    reaction: "Curiosity",
    language: savedSettings.language,
  });

  const [hooks, setHooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  const [saved, setSaved] = useState([]);

  const [topSuggestions] = useState([
    "3 fat-loss myths",
    "one-minute core routine",
    "AI trick for creators",
    "weird history of toilets",
    "how they hacked the game",
  ]);

  const change = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;
    if (!name) return;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const applyPreset = (preset) => {
    setForm((p) => ({ ...p, ...preset.form }));
  };

  const generate = async () => {
    setErr("");
    setHooks([]);
    setLoading(true);
    try {
      const res = await Api.generate(form);
      const items = res?.hooks || [];

      const normalized = items.map((it) =>
        typeof it === "string" ? { text: it, meta: form } : it
      );

      setHooks(normalized);
      setPage(1);

      // auto-copy
      if (savedSettings.autoCopy && normalized.length > 0) {
        navigator.clipboard.writeText(normalized[0].text);
      }
    } catch (e) {
      setErr(e?.message || "Failed to generate hooks.");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async (t) => {
    try {
      await navigator.clipboard.writeText(t);
    } catch {}
  };

  const onSave = (item) => {
    setSaved((s) => [item, ...s]);
  };

  const exportJSON = () => {
    const payload = hooks.map((h) => ({ text: h.text, meta: h.meta }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hooks-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = hooks.map((h) => [
      `"${h.text.replace(/"/g, '""')}"`,
      h.meta.language,
      h.meta.genre,
      h.meta.tone,
    ]);
    const csv = ["text,language,genre,tone", ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hooks-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = hooks.length;
  const pages = Math.ceil(total / perPage) || 1;
  const visible = hooks.slice((page - 1) * perPage, page * perPage);

  const suggestions = useMemo(() => {
    const t = form.topic.toLowerCase();
    const filtered = topSuggestions
      .filter((s) => s.toLowerCase().includes(t))
      .slice(0, 6);
    return filtered.length ? filtered : topSuggestions.slice(0, 6);
  }, [form.topic, topSuggestions]);

  const fadeUp = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };
const SAMPLE_HOOKS = [
  {
    category: "Motivation",
    list: [
      "The moment you feel like quitting… that’s where winners are born.",
      "99% people won’t do this… but that 1% will change their life.",
      "Your future self is begging you not to skip today."
    ]
  },
  {
    category: "Comedy",
    list: [
      "I tried to wake up early… but my bed said ‘Stay, we can fix this together.’",
      "Adulting is basically Googling ‘how to do stuff’ every 5 minutes.",
      "Gym instructor said ‘last set’… he lied."
    ]
  },
  {
    category: "Horror",
    list: [
      "The sound stopped… and that’s when I knew I wasn’t alone.",
      "He said ‘don’t open the door’… but it was already open.",
      "Every night at 3:12 AM… the footsteps return."
    ]
  },
  // {
  //   category: "Fitness",
  //   list: [
  //     "This 20-second habit can burn calories even while sleeping.",
  //     "Stop doing these 3 exercises—they’re wasting your time.",
  //     "Your abs aren’t missing… they’re hiding behind your habits."
  //   ]
  // },
  {
    category: "AI Tool Promotion",
    list: [
      "This AI tool can save creators 5 hours a day—watch this.",
      "If you’re a creator, this tool will change everything.",
      "The tool I wish I discovered 6 months ago—AI just got scary."
    ]
  }
];

  return (
    <div className="max-w-7xl mx-auto p-6">

      {showSettings && (
        <Setting
          close={() => setShowSettings(false)}
          save={(val) => {
            localStorage.setItem("hook_settings", JSON.stringify(val));
            setShowSettings(false);
          }}
        />
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-white px-3 py-2 rounded-lg border">
            <div className="text-xs text-red-500">Credit</div>
            <div className="text-sm font-medium">{total}</div>
          </div> */}

          <button onClick={exportJSON} className="px-3 py-2 border rounded text-sm">
            Export JSON
          </button>

          <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">
            Export CSV
          </button>

          <Link
            to="/pricing1"
            className="px-3 py-2 border rounded text-sm bg-gradient-to-r from-green-700 to-blue-500 text-white"
          >
            Upgrade
          </Link>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANEL */}
        <motion.aside
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="col-span-1 bg-white p-5 rounded-2xl shadow-md border"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Create Hooks</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fine tune prompts and generate scroll-stopping lines.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              ✨
            </div>
          </div>

          {/* FORM */}
          <div className="mt-4 space-y-3">
            <label className="block text-xs font-medium">Niche</label>
            <input
              type="text"
              name="niche"
              value={form.niche}
              onChange={change}
              placeholder="Enter niche — e.g. Horror / Fitness"
              className="w-full border p-2 rounded-lg bg-white"
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium">Genre</label>
                <select
                  name="genre"
                  value={form.genre}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  {GENRES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium">Tone</label>
                <select
                  name="tone"
                  value={form.tone}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  {TONES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="block text-xs font-medium">Topic</label>
            <input
              name="topic"
              value={form.topic}
              onChange={change}
              placeholder="Topic — e.g. AI tool, Horror story, etc."
              className="w-full border p-2 rounded-lg"
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium">Conflict</label>
                <select
                  name="conflict"
                  value={form.conflict}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="problem">Problem</option>
                  <option value="goal">Goal</option>
                  <option value="twist">Twist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium">Reaction</label>
                <select
                  name="reaction"
                  value={form.reaction}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  {REACTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium">Language</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium">Type</label>
                <select
                  name="hookType"
                  value={form.hookType}
                  onChange={change}
                  className="w-full border p-2 rounded-lg"
                >
                  <option>Question</option>
                  <option>Curiosity</option>
                  <option>Story</option>
                  <option>Shock</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="block text-xs font-medium">Count</label>
              <input
                type="number"
                name="count"
                min={1}
                max={20}
                value={form.count}
                onChange={change}
                className="border p-2 rounded-lg w-20"
              />
              <button
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    count: Math.min(20, (p.count || 1) + 1),
                  }))
                }
                className="ml-auto text-sm px-3 py-1 bg-slate-100 rounded-lg"
              >
                +1
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={generate}
                className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </button>

              <button
                onClick={() => {
                  setHooks([]);
                  setErr("");
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.aside>

        {/* RIGHT SIDE (OUTPUT) */}
        {/* <div className="col-span-2">
          {loading && <Loader />}

          {err && <p className="text-red-500 mb-3">{err}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visible.map((item, i) => (
              <HookCard
                key={i}
                {...item}
                onCopy={onCopy}
                onSave={() => onSave(item)}
              />
            ))}
          </div> */}
          {/* RIGHT SIDE (OUTPUT) */}
<div className="col-span-2">

  {loading && <Loader />}
  {err && <p className="text-red-500 mb-3">{err}</p>}

  {/* If no generated hooks → show samples */}
  {!loading && hooks.length === 0 && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {SAMPLE_HOOKS.map((cat) => (
        <motion.div
          key={cat.category}
          className="p-4 border rounded-xl shadow-sm bg-white"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="font-semibold mb-2">{cat.category}</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            {cat.list.map((line, i) => (
              <li key={i} className="p-2 bg-slate-50 rounded-md">
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )}

  {/* After generating hooks → show HookCards */}
  {hooks.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {visible.map((item, i) => (
        <HookCard
          key={i}
          {...item}
          onCopy={onCopy}
          onSave={() => onSave(item)}
        />
      ))}
    </div>
  )}

  {/* Pagination */}
  {hooks.length > 0 && pages > 1 && (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded 
           ${page === i + 1 ? "bg-black text-white" : "bg-slate-200"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )}

</div>


          {/* Pagination */}
          {/* {pages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded border ${
                    page === i + 1 ? "bg-emerald-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )} */}
        </div>
      </div>
    // </div>
  );
}
