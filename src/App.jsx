import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Calendar, FileText } from 'lucide-react';

const App = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [modules, setModules] = useState([
    { title: '', points: [''] }
  ]);
  const [copied, setCopied] = useState(false);
  const [subCopied, setSubCopied] = useState(false);

  const addModule = () => setModules([...modules, { title: '', points: [''] }]);
  const removeModule = (index) => setModules(modules.filter((_, i) => i !== index));
  const updateModuleTitle = (index, value) => {
    const updated = [...modules];
    updated[index].title = value;
    setModules(updated);
  };
  const addPoint = (moduleIndex) => {
    const updated = [...modules];
    updated[moduleIndex].points.push('');
    setModules(updated);
  };
  const removePoint = (moduleIndex, pointIndex) => {
    const updated = [...modules];
    updated[moduleIndex].points = updated[moduleIndex].points.filter((_, i) => i !== pointIndex);
    setModules(updated);
  };
  const updatePoint = (moduleIndex, pointIndex, value) => {
    const updated = [...modules];
    updated[moduleIndex].points[pointIndex] = value;
    setModules(updated);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
      day === 2 || day === 22 ? 'nd' :
        day === 3 || day === 23 ? 'rd' : 'th';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day}${suffix} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formattedDate = formatDate(date);
  let subject = `EOD Update - ${formattedDate}`;

  const generateEOD = () => {
    let output = `Hi Harshit Sir and Aniket Sir,\n`;
    output += `Here's the summary of today's work:\n\n`;

    modules.forEach((module, index) => {
      if (module.title.trim()) {
        output += `${index + 1}. ${module.title}\n`;
        module.points.forEach(point => {
          if (point.trim()) {
            output += `* ${point}\n`;
          }
        });
        output += `\n`;
      }
    });

    output += `Regards, Abhishek`;
    return output;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEOD());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const el = document.createElement('textarea');
      el.value = generateEOD();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copySubject = async () => {
    try {
      await navigator.clipboard.writeText(subject);
      setSubCopied(true);
      setTimeout(() => setSubCopied(false), 2000);
    } catch (err) {
      const el = document.createElement('textarea');
      el.value = subject;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
      setSubCopied(true);
      setTimeout(() => setSubCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">EOD Generator</h1>
          <p className="text-gray-600 text-lg">Create professional end-of-day reports in seconds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Date Card */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <Calendar className="text-teal-600" size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Select Date</h2>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition text-gray-800 text-lg"
              />
            </div>

            {/* Modules Card */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Work Modules</h2>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="rounded-xl p-5 border border-gray-100 bg-white">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">#{moduleIndex + 1}</span>
                          <span className="text-gray-500 text-sm">Module Title</span>
                        </div>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
                          placeholder="e.g., Raise Ticket Module"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-100 transition text-gray-800 placeholder-gray-400"
                        />
                      </div>
                      {modules.length > 1 && (
                        <button
                          onClick={() => removeModule(moduleIndex)}
                          className="mt-8 p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition border border-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 ml-2">
                      {module.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => updatePoint(moduleIndex, pointIndex, e.target.value)}
                            placeholder="Enter work point..."
                            className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-100 transition text-gray-800 placeholder-gray-400 text-sm"
                          />
                          {module.points.length > 1 && (
                            <button
                              onClick={() => removePoint(moduleIndex, pointIndex)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition border border-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addPoint(moduleIndex)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition text-sm font-medium border border-teal-100 mt-2"
                      >
                        <Plus size={16} />
                        Add Point
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addModule}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition font-semibold shadow-sm text-lg"
              >
                <Plus size={20} />
                Add New Module
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 h-fit space-y-2">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <FileText className="text-emerald-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{subject}</h2>
                </div>
                <button
                  onClick={copySubject}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-semibold shadow ${copied ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                >
                  {subCopied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <FileText className="text-emerald-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Live Preview</h2>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-semibold shadow ${copied ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 max-h-[600px] overflow-y-auto custom-scrollbar">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">{generateEOD()}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`\n        .custom-scrollbar::-webkit-scrollbar {\n          width: 8px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-track {\n          background: rgba(15, 23, 42, 0.03);\n          border-radius: 10px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb {\n          background: rgba(100,116,139,0.25);\n          border-radius: 10px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb:hover {\n          background: rgba(100,116,139,0.35);\n        }\n      `}</style>
    </div>
  );
};

export default App;
