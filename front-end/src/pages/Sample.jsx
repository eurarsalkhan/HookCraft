import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const CATEGORIES = ["Horror", "Comedy", "Motivation", "Mystery", "History", "Sci-Fi"];

const TEMPLATES = {
  Horror: [
    "If your room feels colder than your house… don’t ignore this.",
    "She heard footsteps upstairs… but nobody lived above them.",
    "Never open your door after 3:17 AM. Here’s why…",
    "The camera caught something moving… but nobody was home.",
    "Every night at 2:43 AM, the same knock. Same pattern. Same fear.",
    "If your pet stares at a corner… look away. Don’t check.",
    "Someone keeps rearranging his furniture. He lives alone.",
    "The baby monitor picked up a voice… whispering his name.",
    "Never sleep with your feet outside the blanket.",
    "When the lights flicker twice… hide.",
  ],

  Comedy: [
    "I knew my life was a joke when even Google Maps said ‘Good luck.’",
    "My sleep schedule is like my ex—broken and toxic.",
    "If overthinking was a sport, I'd win a lifetime achievement award.",
    "Gym trainers say ‘Feel the burn.’ Bro, I feel my soul leaving.",
    "My WiFi is faster at night because even it hates people.",
    "I tried adulting. I want a refund.",
    "My diet plan is simple: see food → eat food.",
    "I talk to myself because I need expert advice.",
    "The only thing I run from is responsibilities.",
    "I don’t need a hairstylist. My pillow does the job.",
  ],

  Motivation: [
    "Your future self is watching you. Make him proud.",
    "You're not tired. You're untrained. Fix that.",
    "Discipline beats motivation every single day.",
    "If you feel stuck, you're leveling up silently.",
    "Success starts one uncomfortable step at a time.",
    "Your small progress today becomes your big win tomorrow.",
    "Don’t wait for the right time. Create it.",
    "Nobody is coming to save you—be your own hero.",
    "Repeat after me: I deserve better, and I'm working for it.",
    "Turn your pain into discipline and your discipline into power.",
  ],

  Mystery: [
    "The city reported zero crimes last night… too quiet to be normal.",
    "He got a letter with no sender—just a message: ‘RUN.’",
    "A man disappeared after saying ‘I figured it out.’",
    "Every mirror in the house cracked at the same time.",
    "His phone rang. Caller ID: His own number.",
    "The elevator stopped at a floor that doesn't exist.",
    "A missing person showed up… in a photo taken yesterday.",
    "He heard his OWN voice coming from another room.",
    "The clocks froze at 11:11 PM. Then something moved.",
    "Every night, a shadow passes his window—on the 12th floor.",
  ],

  History: [
    "The most dangerous king in history wasn’t killed—he vanished.",
    "This invention was banned because it worked *too* well.",
    "A 2,000-year-old book predicted our modern world.",
    "A war was ended by a man history refuses to credit.",
    "A civilization disappeared without leaving a single body behind.",
    "The greatest treasure in history is still undiscovered.",
    "A queen ruled for 40 years—but her real identity was hidden.",
    "One letter changed the fate of an entire empire.",
    "The world's biggest conspiracy started with a map.",
    "A forgotten prophecy might finally be coming true.",
  ],

  "Sci-Fi": [
    "Earth received a signal yesterday. Not noise… a pattern.",
    "He woke up in a world where nobody remembered him.",
    "Time travel isn’t real… until you see this.",
    "Scientists found something under Antarctica’s ice—alive.",
    "An AI wrote a message humans cannot decode.",
    "The moon’s orbit shifted 3 cm… and NASA is scared.",
    "Nobody knows who built the abandoned space station.",
    "He met someone who claimed to be his future self.",
    "A star blinked in Morse code. Once.",
    "Last night, a satellite recorded something entering Earth—but nothing left.",
  ],
};

export default function Sample() {
  const [active, setActive] = useState("Horror");

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">
        Premium Hook Templates
      </h1>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              active === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* HOOK CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES[active].map((hook, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-700">{hook}</p>

            <button
              onClick={() => copy(hook)}
              className="mt-3 flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
            >
              <Copy size={16} />
              Copy
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

