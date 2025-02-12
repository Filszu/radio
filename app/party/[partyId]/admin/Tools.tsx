import { useState } from "react";
import { FaMusic, FaCogs, FaCode } from "react-icons/fa";

export default function FeatureBoxes() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-6 mb-6">
        <div
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setActiveSection(activeSection === "song" ? null : "song")}
        >
          <FaMusic className="text-4xl text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold">Manage Song</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setActiveSection(activeSection === "party" ? null : "party")}
        >
          <FaCogs className="text-4xl text-green-500 mb-2" />
          <h2 className="text-lg font-semibold">Party Settings</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg w-60 h-40 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setActiveSection(activeSection === "tools" ? null : "tools")}
        >
          <FaCode className="text-4xl text-purple-500 mb-2" />
          <h2 className="text-lg font-semibold">Programmer's Tools</h2>
        </div>
      </div>

      {activeSection === "song" && (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-2xl transition-opacity duration-500 opacity-100">
          <h3 className="text-xl font-bold">Manage Song Section</h3>
          <p>Here you can manage your songs and playlists.</p>
        </div>
      )}
      {activeSection === "party" && (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-2xl transition-opacity duration-500 opacity-100">
          <h3 className="text-xl font-bold">Party Settings Section</h3>
          <p>Adjust your party settings and preferences.</p>
        </div>
      )}
      {activeSection === "tools" && (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-2xl transition-opacity duration-500 opacity-100">
          <h3 className="text-xl font-bold">Programmer's Tools Section</h3>
          <p>Access various tools to help with programming.</p>
        </div>
      )}
    </div>
  );
}
