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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            General <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Preferences</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Customize how Vendora looks and feels.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        >
          <div className="p-8 space-y-8">
            {/* Theme selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900">
                    Theme
                  </label>
                  <p className="text-sm text-gray-600">Choose your preferred color scheme</p>
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 
                  focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200
                "
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="system">💻 System Default</option>
              </select>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Layout density */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900">
                    Layout Density
                  </label>
                  <p className="text-sm text-gray-600">Adjust spacing and content density</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLayout("comfortable")}
                  className={`
                    flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105
                    ${layout === "comfortable" 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  onClick={() => setLayout("compact")}
                  className={`
                    flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105
                    ${layout === "compact" 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  Compact
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Animation toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">Enable Animations</p>
                  <p className="text-sm text-gray-600">
                    Turn on/off subtle UI animations.
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={animations}
                  onChange={(e) => setAnimations(e.target.checked)}
                  className="sr-only"
                />
                <button
                  type="button"
                  onClick={() => setAnimations(!animations)}
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                    ${animations ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gray-200'}
                  `}
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                      transition duration-200 ease-in-out
                      ${animations ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save button section */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="
                  px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl
                  hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
                "
              >
                Save Preferences
              </button>
            </div>
          </div>
        </form>

        {/* Additional Info Card */}
        <div className="mt-8 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About Preferences</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your preferences are saved locally and will be applied across all your sessions. 
                Theme changes take effect immediately, while layout changes may require a page refresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}