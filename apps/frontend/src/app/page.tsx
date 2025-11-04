"use client";

import { motion } from "framer-motion";
import AISummary from "src/components/AISummary";
import CallToAction from "src/components/CallToAction";
import CaseStudies from "src/components/CaseStudies";
import CommunityVision from "src/components/CommunityVision";
import DownloadableReports from "src/components/DownloadableReports";
import FeaturesCapabilities from "src/components/FeaturesCapabilities";
import FinancialFeasibility from "src/components/FinancialFeasibility";
import Footer from "src/components/Footer";
import Hero from "src/components/Hero";
import ImpactMetrics from "src/components/ImpactMetrics";
import Container from "src/components/layout/Container";
import ProblemStatement from "src/components/ProblemStatement";
import ResultsAnalytics from "src/components/ResultsAnalytics";
import TargetUsers from "src/components/TargetUsers";
import TechStack from "src/components/TechStack";
import WhatRainCheckDoes from "src/components/WhatRainCheckDoes";
// import Container from "@/components/layout/Container";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden text-gray-800">
      {/* Hero Section */}
      <section id="hero" className="w-full">
        <Hero />
      </section>

      {/* Problem / Challenge Section */}
      <motion.section
        id="problem"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
        {/* <Container> */}
          <ProblemStatement />
        {/* </Container> */}
      </motion.section>

      {/* What RainCheck Does */}
      <motion.section
        id="what-raincheck-does"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
          <WhatRainCheckDoes />
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-sky-50"
      >
          <FeaturesCapabilities />
      </motion.section>

      {/* Visual Analytics & Results */}
      <motion.section
        id="results"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
          <ResultsAnalytics />
      </motion.section>

      {/* Target Users */}
      <motion.section
        id="users"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-white"
      >
          <TargetUsers />
      </motion.section>

      {/* Environmental & Economic Impact */}
      <motion.section
        id="impact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-sky-50"
      >
          <ImpactMetrics />
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        id="tech-stack"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
          <TechStack />
      </motion.section>

      {/* Financial Simulation */}
      <motion.section
        id="financial"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-white"
      >
          <FinancialFeasibility />
      </motion.section>

      {/* Case Studies */}
      <motion.section
        id="case-studies"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-sky-50"
      >
          <CaseStudies />
      </motion.section>

      {/* AI Summary */}
      <motion.section
        id="ai-summary"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
          <AISummary />
      </motion.section>

      {/* Downloadable Reports */}
      <motion.section
        id="reports"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-white"
      >
          <DownloadableReports />
      </motion.section>

      {/* Community & Policy Vision */}
      <motion.section
        id="community"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-sky-50"
      >
          <CommunityVision />
      </motion.section>

      {/* Call To Action */}
      <motion.section
        id="cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
          <CallToAction />
      </motion.section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white">
        <Footer />
      </footer>
    </main>
  );
}
