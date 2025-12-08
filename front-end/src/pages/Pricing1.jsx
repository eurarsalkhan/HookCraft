import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <>
      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-12 text-black">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center"
        >
          Pricing that scales with you
        </motion.h3>

        <p className="text-center text-slate-300 mt-2">
          Choose the plan that fits your workflow.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <PriceCard
            title="Starter"
            price="Free"
            features={["20 Credits / month", "CSV export", "Basic templates"]}
            link="/generator"

          />
          <PriceCard
            title="Pro"
            price="₹49/mo"
            highlight
            features={["100 Credits", "Team seats", "Priority support"]}
            link="/billing"
          />

          <PriceCard
            title="Enterprise"
            price="Custom"
            features={["SAML SSO", "Dedicated success", "Custom integration"]}
            link="/generator"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between shadow-xl"
        >
          <div>
            <h4 className="text-2xl font-bold">Ready to ship more viral ideas?</h4>
            <p className="mt-2 text-slate-100 text-sm">
              Start for free — upgrade as your team scales.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-4">
            <Link
              to="/generator"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
            >
              Go & Generate!
            </Link>

            <Link
              to="/sample"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-emerald-600 transition"
            >
              See Sample
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
function PriceCard({ title, price, features, highlight, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-2xl backdrop-blur-xl bg-white/10 border 
      ${highlight ? "border-emerald-600 shadow-xl" : "border-slate-200 shadow"}`}
    >
      <h4 className="text-xl font-bold">{title}</h4>

      <p
        className={`text-3xl font-bold mt-2 ${
          highlight ? "text-emerald-600" : "text-slate-700"
        }`}
      >
        {price}
      </p>

      <ul className="mt-4 space-y-2 text-slate-600">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-emerald-500">✔</span> {f}
          </li>
        ))}
      </ul>

      <Link
        to={link}  // <-- dynamic link per plan
        className={`mt-6 w-full py-3 rounded-lg font-semibold text-center block transition
          ${
            highlight
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
      >
        Choose Plan
      </Link>
    </motion.div>
  );
}