import React, { useState } from "react";

export default function General() {
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("comfortable");
  const [animations, setAnimations] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    console.log({
      theme,
      layout,
      animations,
    });
    // save to backend or localStorage
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Title */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900">
          General <span className="text-blue-600">Preferences</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Customize how Vendora looks and feels.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5"
      >
        {/* Theme selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">💻 System Default</option>
          </select>
        </div>

        {/* Layout density */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Layout Density
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLayout("comfortable")}
              className={`btn ${
                layout === "comfortable" ? "btn-primary" : "btn-outline"
              }`}
            >
              Comfortable
            </button>
            <button
              type="button"
              onClick={() => setLayout("compact")}
              className={`btn ${
                layout === "compact" ? "btn-primary" : "btn-outline"
              }`}
            >
              Compact
            </button>
          </div>
        </div>

        {/* Animation toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Enable Animations</p>
            <p className="text-xs text-gray-500">
              Turn on/off subtle UI animations.
            </p>
          </div>
          <input
            type="checkbox"
            checked={animations}
            onChange={(e) => setAnimations(e.target.checked)}
            className="toggle toggle-primary"
          />
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="submit" className="btn btn-primary">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
