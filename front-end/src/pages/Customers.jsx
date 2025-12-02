import React from "react";
import { Star, Quote } from "lucide-react";

export default function Customers() {
  const REVIEWS = [
    {
      name: "Rahul",
      role: "Content Creator",
      text: "This app has boosted my engagement instantly! The hooks are crazy good.",
    },
    {
      name: "Priya",
      role: "YouTuber",
      text: "Hook generation is so fast and accurate. Saved me so much time!",
    },
    {
      name: "Ankit",
      role: "Instagram Creator",
      text: "Highly recommended for creators who struggle with ideas. Absolute game-changer!",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-6 min-h-screen">

<div className="max-w-6xl mx-auto">
        
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-black">
            What Our Customers Say
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-3 text-lg">
            Trusted by creators across YouTube, Instagram, and Reels.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <Quote className="text-purple-500 dark:text-purple-400 mb-4" size={32} />

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {review.text}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mt-4">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>

              {/* User Info */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {review.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-10 py-4 rounded-xl text-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            Start Creating Hooks Now
          </a>
        </div>
      </div>
    </div>
  );
}
