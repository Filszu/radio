"use client";
import { useState, ReactNode } from "react";
import { FaMusic, FaCogs, FaCode } from "react-icons/fa";

interface FeatureBoxesProps {
  section1: ReactNode;
  section2: ReactNode;
  section3: ReactNode;
}

export default function FeatureBoxes({ section1, section2, section3 }: FeatureBoxesProps) {
  const [activeSection, setActiveSection] = useState<"song" | "party" | "tools" | null>(null);

  return (
    <div className="flex flex-col items-center p-6  text-white ">
      <div className="flex flex-wrap justify-center gap-6 mb-6 w-full max-w-5xl">
        <div
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105 ${
            activeSection === "song" ? "bg-blue-600 text-white" : "bg-gray-800"
          }`}
          onClick={() => setActiveSection(activeSection === "song" ? null : "song")}
        >
          <FaMusic className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Manage Song</h2>
        </div>
        <div
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105 ${
            activeSection === "party" ? "bg-green-600 text-white" : "bg-gray-800"
          }`}
          onClick={() => setActiveSection(activeSection === "party" ? null : "party")}
        >
          <FaCogs className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Party Settings</h2>
        </div>
        <div
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105 ${
            activeSection === "tools" ? "bg-purple-600 text-white" : "bg-gray-800"
          }`}
          onClick={() => setActiveSection(activeSection === "tools" ? null : "tools")}
        >
          <FaCode className="text-4xl mb-2" />
          <h2 className="text-lg font-semibold">Programmer's Tools</h2>
        </div>
      </div>

      {activeSection === "song" && (
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg w-full max-w-5xl transition-opacity duration-500 opacity-100">
          {section1}
        </div>
      )}
      {activeSection === "party" && (
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg w-full max-w-5xl transition-opacity duration-500 opacity-100">
          {section2}
        </div>
      )}
      {activeSection === "tools" && (
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl transition-opacity duration-500 opacity-100">
          {section3}
        </div>
      )}
    </div>
  );
}
