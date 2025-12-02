import React from "react";
import { CheckCircle, Zap, Copy, Languages, Save, Sparkles } from "lucide-react";

export default function Features() {
  const FEATURES = [
    {
      icon: <Zap size={28} />,
      title: "Instant Hook Generation",
      desc: "Generate powerful, scroll-stopping hooks for Reels, Shorts, and YouTube instantly.",
    },
    {
      icon: <Languages size={28} />,
      title: "Multi-Language Support",
      desc: "Choose your preferred language for your content audience.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Different Tones & Genres",
      desc: "Select tone, genre, and style to match your brand personality.",
    },
    {
      icon: <Copy size={28} />,
      title: "One-Click Copy",
      desc: "Copy any generated hook instantly without extra steps.",
    },
    {
      icon: <Save size={28} />,
      title: "Save Your Favorite Hooks",
      desc: "Save hooks to your profile and use them anytime.",
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Auto-Copy Mode",
      desc: "Enable auto-copy for faster workflow and rapid content creation.",
    },
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-8">
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

   <div className="max-w-6xl mx-auto w-full"></div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-black drop-shadow">
            Powerful Features for Creators
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-3 text-lg">
            Everything you need to create viral hooks and grow your content.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="text-purple-600 dark:text-purple-400 mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <a
            href="/login"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            Start Creating Hooks
          </a>
        </div>
      </div>
    </div>
  );
}
