"use client";

import { motion } from "framer-motion";
import { Droplets, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-[#0B0B0C] text-gray-300 pt-20 pb-10 border-t border-gray-800"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,184,77,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-8"
        >
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Droplets className="h-6 w-6" />
            <span className="text-xl font-semibold tracking-wide">RainCheck</span>
          </div>
          <p className="text-gray-500 text-sm max-w-md">
            Empowering sustainable living through intelligent rainwater management.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 text-gray-400 mb-10"
        >
          <Link href="#hero" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href="#features" className="hover:text-amber-400 transition-colors">
            Features
          </Link>
          <Link href="#impact" className="hover:text-amber-400 transition-colors">
            Impact
          </Link>
          <Link href="#case-studies" className="hover:text-amber-400 transition-colors">
            Case Studies
          </Link>
          <Link href="#community" className="hover:text-amber-400 transition-colors">
            Community
          </Link>
          <Link href="#cta" className="hover:text-amber-400 transition-colors">
            Get Started
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-center gap-6 mb-8"
        >
          <Link
            href="https://github.com/"
            target="_blank"
            className="text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/"
            target="_blank"
            className="text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            className="text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} RainCheck. All rights reserved.  
          <span className="block sm:inline text-amber-400 font-medium">
            &nbsp;Sustain smarter, live greener.
          </span>
        </p>
      </div>
    </motion.footer>
  );
}
