import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Target, TrendingUp, Award, Calendar, Clock, Zap, Star, BarChart3, PlusCircle, X, Save, Loader } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UCEEDPreparationTracker = () => {
  const [completedDays, setCompletedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mockTests, setMockTests] = useState([]);
  const [showAddTest, setShowAddTest] = useState(false);
  const [newTest, setNewTest] = useState({ day: '', partA: '', partB: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const daysResult = await window.storage.get('uceed-completed-days');
      if (daysResult && daysResult.value) {
        setCompletedDays(JSON.parse(daysResult.value));
      }
      const testsResult = await window.storage.get('uceed-mock-tests');
      if (testsResult && testsResult.value) {
        setMockTests(JSON.parse(testsResult.value));
      }
    } catch (error) {
      console.log('No saved data found, starting fresh');
    } finally {
      setLoading(false);
    }
  };

  const saveCompletedDays = async (days) => {
    try {
      setSaving(true);
      await window.storage.set('uceed-completed-days', JSON.stringify(days));
    } catch (error) {
      console.error('Error saving completed days:', error);
    } finally {
      setSaving(false);
    }
  };

  const saveMockTests = async (tests) => {
    try {
      setSaving(true);
      await window.storage.set('uceed-mock-tests', JSON.stringify(tests));
    } catch (error) {
      console.error('Error saving mock tests:', error);
    } finally {
      setSaving(false);
    }
  };

  const weeks = [
    {
      week: 1,
      title: "FOUNDATION RESET",
      goal: "Fix fundamentals + boost accuracy + restart drawing muscles",
      color: "from-purple-500 to-pink-500",
      days: [
        { day: 1, tasks: ["Full Part A mock test (BRDS/online)", "Analyse every mistake", "Identify weak zones (NAT/MSQ/MCQ)"], drawing: false },
        { day: 2, tasks: ["Visual & Spatial Reasoning module (BRDS)", "1 drawing: Object + basic perspective (30 mins)"], drawing: true },
        { day: 3, tasks: ["Observation & Design Sensitivity module", "NAT practice (20 mins)", "1 drawing: Product sketch (30-35 mins)"], drawing: true },
        { day: 4, tasks: ["Logical + Analytical Reasoning", "MSQ pattern practice", "1 drawing: Scene with perspective (35 mins)"], drawing: true },
        { day: 5, tasks: ["GK + Design awareness revision", "Speed drill: 20 questions in 15 mins", "1 drawing: Creative ideation prompt"], drawing: true },
        { day: 6, tasks: ["Solve BRDS Part A mixed exercises", "NAT geometry practice", "1 drawing: Problem-solving sketch (35 mins)"], drawing: true },
        { day: 7, tasks: ["Full Part A + Part B mock", "Deep analysis (1 hour)"], drawing: false }
      ]
    },
    {
      week: 2,
      title: "BREAKTHROUGH ZONE",
      goal: "Push Part A past 110-115 + get drawing speed under control",
      color: "from-blue-500 to-cyan-500",
      days: [
        { day: 8, tasks: ["MCQ & MSQ high-frequency questions", "1 drawing: Product redesign"], drawing: true },
        { day: 9, tasks: ["NAT drills (20 questions)", "Visual Reasoning speed test", "1 drawing: Scene/storyboard"], drawing: true },
        { day: 10, tasks: ["Part A mini-test (45 min)", "Analyse", "30-min perspective practice"], drawing: true },
        { day: 11, tasks: ["Logical + Analytical mixed set", "MSQ accuracy routine", "Drawing freehand practice (15 min)"], drawing: true },
        { day: 12, tasks: ["GK/design awareness revision", "30 min NAT practice", "1 drawing: Creativity question"], drawing: true },
        { day: 13, tasks: ["Solve timed Part A (1 hr)", "Fix weak topics", "1 Part-B sketch (35 mins)"], drawing: true },
        { day: 14, tasks: ["Full Part A + Part B mock", "Deep analysis", "Target: Part A ~110-120"], drawing: false }
      ]
    },
    {
      week: 3,
      title: "MASTERY PHASE",
      goal: "Final jump to 130+ in Part A + make Part B very clean",
      color: "from-orange-500 to-red-500",
      days: [
        { day: 15, tasks: ["NAT accuracy (difficult ones)", "MSQ pattern practice", "1 drawing: Complex product"], drawing: true },
        { day: 16, tasks: ["Spatial reasoning mixed set", "BRDS visual exercises", "1 drawing: 2-point perspective scene"], drawing: true },
        { day: 17, tasks: ["90-min Part A simulation", "Fix errors", "1 drawing: Functionality-focused sketch"], drawing: true },
        { day: 18, tasks: ["Logical puzzles", "GK revision", "1 drawing: Object + shadow + highlights"], drawing: true },
        { day: 19, tasks: ["MSQ heavy practice (20+ questions)", "NAT geometry", "1 drawing: Storyboard (4 frames)"], drawing: true },
        { day: 20, tasks: ["Timed Part A mini-test (1 hr)", "Analyse", "1 drawing: Redesign product"], drawing: true },
        { day: 21, tasks: ["Full mock (Part A + B)", "Analyse errors", "Target: Part A 120-130"], drawing: false }
      ]
    },
    {
      week: 4,
      title: "PEAK PERFORMANCE",
      goal: "Exam-level performance + polish + peak at the right time",
      color: "from-green-500 to-emerald-500",
      days: [
        { day: 22, tasks: ["NAT final polish", "MSQ elimination pattern training", "1 drawing: Quick scene sketch"], drawing: true },
        { day: 23, tasks: ["Part A practice (harder set)", "1 drawing: Product design + labeling"], drawing: true },
        { day: 24, tasks: ["Full mock", "Analyse (1 hr)", "Fix time-management issues"], drawing: false },
        { day: 25, tasks: ["GK final revision", "Logical reasoning", "1 drawing: Creative question"], drawing: true },
        { day: 26, tasks: ["Speed test (50Q in 35min)", "Perspective drill: 15 minutes", "1 drawing: Problem-solving sketch"], drawing: true },
        { day: 27, tasks: ["Full mock", "Compare with previous mocks", "Identify final 5 weak topics"], drawing: false },
        { day: 28, tasks: ["Revise only weak topics", "NAT boundary cases", "1 drawing: Current trend/design story"], drawing: true },
        { day: 29, tasks: ["Short mock (1 hr)", "Light drawing practice", "Sleep well, avoid fatigue"], drawing: true },
        { day: 30, tasks: ["✔ Light revision", "✔ Previous errors review", "✔ Clean perspective practice", "NO heavy mock today", "Rest your brain for tomorrow"], drawing: false }
      ]
    }
  ];

  const toggleDay = async (day) => {
    let updatedDays;
    if (completedDays.includes(day)) {
      updatedDays = completedDays.filter(d => d !== day);
    } else {
      updatedDays = [...completedDays, day];
    }
    setCompletedDays(updatedDays);
    await saveCompletedDays(updatedDays);
  };

  const addMockTest = async () => {
    if (newTest.day && newTest.partA && newTest.partB) {
      const partANum = parseFloat(newTest.partA);
      const partBNum = parseFloat(newTest.partB);
      
      if (partANum >= 0 && partANum <= 200 && partBNum >= 0 && partBNum <= 100) {
        const updatedTests = [...mockTests, {
          day: parseInt(newTest.day),
          partA: partANum,
          partB: partBNum,
          total: partANum + partBNum,
          date: new Date().toLocaleDateString()
        }].sort((a, b) => a.day - b.day);
        
        setMockTests(updatedTests);
        await saveMockTests(updatedTests);
        
        setNewTest({ day: '', partA: '', partB: '' });
        setShowAddTest(false);
      }
    }
  };

  const removeMockTest = async (index) => {
    const updatedTests = mockTests.filter((_, i) => i !== index);
    setMockTests(updatedTests);
    await saveMockTests(updatedTests);
  };

  const progress = (completedDays.length / 30) * 100;
  const currentScore = 95 + (completedDays.length * 1.67);
  const targetScore = 210;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="text-purple-400 animate-spin mx-auto mb-4" size={48} />
          <p className="text-white text-xl font-bold">Loading your progress...</p>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {saving && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg z-50">
          <Save size={18} className="animate-pulse" />
          <span className="font-semibold">Saving...</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="text-yellow-400 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              UCEED 30-DAY
            </h1>
            <Zap className="text-yellow-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            TRANSFORMATION JOURNEY
          </p>
          <p className="text-gray-400 mt-2">95 → 130+ (Part A) | 55 → 75 (Part B)</p>
          <p className="text-green-400 text-sm mt-2 flex items-center justify-center gap-2">
            <Save size={16} />
            Your progress is automatically saved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-400" size={24} />
              <span className="text-gray-300 text-sm">Current Progress</span>
            </div>
            <div className="text-3xl font-black text-white mb-2">{completedDays.length}/30</div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-500"
                style={{ width: ${progress}% }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-blue-400" size={24} />
              <span className="text-gray-300 text-sm">Projected Score</span>
            </div>
            <div className="text-3xl font-black text-white">{Math.round(currentScore)}</div>
            <div className="text-sm text-gray-400">Target: {targetScore}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-yellow-400" size={24} />
              <span className="text-gray-300 text-sm">Target Rank</span>
            </div>
            <div className="text-3xl font-black text-white">AIR &lt;30</div>
            <div className="text-sm text-gray-400">Possible: AIR &lt;15</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {mockTests.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-cyan-400" size={28} />
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  MOCK TEST PROGRESS
                </h2>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockTests}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#fff"
                    label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: '#fff' }}
                  />
                  <YAxis 
                    stroke="#fff"
                    label={{ value: 'Marks', angle: -90, position: 'insideLeft', fill: '#fff' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="partA" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    name="Part A (Max: 200)"
                    dot={{ fill: '#06b6d4', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="partB" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    name="Part B (Max: 100)"
                    dot={{ fill: '#f97316', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Total (Max: 300)"
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {mockTests.map((test, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 relative group">
                  <button
                    onClick={() => removeMockTest(idx)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="text-red-400 hover:text-red-300" size={18} />
                  </button>
                  <div className="text-sm text-gray-400 mb-2">Day {test.day} • {test.date}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 text-sm">Part A:</span>
                      <span className="text-white font-bold">{test.partA}/200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-400 text-sm">Part B:</span>
                      <span className="text-white font-bold">{test.partB}/100</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-green-400 text-sm font-semibold">Total:</span>
                      <span className="text-white font-black text-lg">{test.total}/300</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAddTest && (
              <button
                onClick={() => setShowAddTest(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <PlusCircle size={20} />
                Add Mock Test Score
              </button>
            )}

            {showAddTest && (
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Day (1-30)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={newTest.day}
                      onChange={(e) => setNewTest({...newTest, day: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Day"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Part A (Max: 200)</label>
                    <input
                      type="number"
                      min="0"
                      max="200"
                      step="0.5"
                      value={newTest.partA}
                      onChange={(e) => setNewTest({...newTest, partA: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Part A Score"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Part B (Max: 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={newTest.partB}
                      onChange={(e) => setNewTest({...newTest, partB: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400"
                      placeholder="Part B Score"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addMockTest}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Save Test
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTest(false);
                      setNewTest({ day: '', partA: '', partB: '' });
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {mockTests.length >= 2 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
                  <div className="text-cyan-400 text-sm font-semibold mb-1">Part A Improvement</div>
                  <div className="text-white text-2xl font-black">
                    +{(mockTests[mockTests.length - 1].partA - mockTests[0].partA).toFixed(1)}
                  </div>
                  <div className="text-gray-300 text-xs mt-1">
                    {mockTests[0].partA} → {mockTests[mockTests.length - 1].partA}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
                  <div className="text-orange-400 text-sm font-semibold mb-1">Part B Improvement</div>
                  <div className="text-white text-2xl font-black">
                    +{(mockTests[mockTests.length - 1].partB - mockTests[0].partB).toFixed(1)}
                  </div>
                  <div className="text-gray-300 text-xs mt-1">
                    {mockTests[0].partB} → {mockTests[mockTests.length - 1].partB}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-green-400 text-sm font-semibold mb-1">Total Improvement</div>
                  <div className="text-white text-2xl font-black">
                    +{(mockTests[mockTests.length - 1].total - mockTests[0].total).toFixed(1)}
                  </div>
                  <div className="text-gray-300 text-xs mt-1">
                    {mockTests[0].total} → {mockTests[mockTests.length - 1].total}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {mockTests.length === 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center">
            <BarChart3 className="text-cyan-400 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Track Your Mock Test Progress</h3>
            <p className="text-gray-400 mb-6">Add your mock test scores to see your improvement over time</p>
            <button
              onClick={() => setShowAddTest(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl inline-flex items-center gap-2 transition-all"
            >
              <PlusCircle size={20} />
              Add Your First Mock Test
            </button>
            {showAddTest && (
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Day (1-30)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={newTest.day}
                      onChange={(e) => setNewTest({...newTest, day: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Day"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Part A (Max: 200)</label>
                    <input
                      type="number"
                      min="0"
                      max="200"
                      step="0.5"
                      value={newTest.partA}
                      onChange={(e) => setNewTest({...newTest, partA: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Part A Score"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Part B (Max: 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={newTest.partB}
                      onChange={(e) => setNewTest({...newTest, partB: e.target.value})}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400"
                      placeholder="Part B Score"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addMockTest}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Save Test
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTest(false);
                      setNewTest({ day: '', partA: '', partB: '' });
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {weeks.map((week) => (
          <div key={week.week} className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Star className="text-yellow-400" size={24} />
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  WEEK {week.week}: {week.title}
                </h2>
              </div>
              <p className={text-sm md:text-base font-semibold bg-gradient-to-r ${week.color} bg-clip-text text-transparent}>
                {week.goal}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {week.days.map((dayData) => {
                const isCompleted = completedDays.includes(dayData.day);
                const isSelected = selectedDay === dayData.day;
                
                return (
                  <div
                    key={dayData.day}
                    onClick={() => setSelectedDay(isSelected ? null : dayData.day)}
                    className={`relative rounded-2xl p-4 border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      isCompleted 
                        ? bg-gradient-to-br ${week.color} border-white/40 shadow-lg 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    } ${isSelected ? 'ring-4 ring-white/50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-white" size={18} />
                        <span className="font-black text-white text-lg">DAY {dayData.day}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDay(dayData.day);
                        }}
                        className="transition-transform hover:scale-110"
                      >
                        {isCompleted ? (
                          <CheckCircle className="text-white" size={24} />
                        ) : (
                          <Circle className="text-white/50" size={24} />
                        )}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dayData.tasks.slice(0, isSelected ? undefined : 2).map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                          <div className="min-w-1 w-1 h-1 rounded-full bg-white/70 mt-1.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                      {!isSelected && dayData.tasks.length > 2 && (
                        <div className="text-xs text-white/60 italic">
                          +{dayData.tasks.length - 2} more tasks...
                        </div>
                      )}
                    </div>

                    {dayData.drawing && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-white/80">
                        <Clock size={14} />
                        <span>Drawing Practice</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-yellow-500/30">
        <h3 className="text-3xl font-black text-white mb-6 text-center">
          🔥 EXPECTED RESULTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-2">Part A</div>
            <div className="text-4xl font-black text-white mb-1">95 → 145</div>
            <div className="text-sm text-yellow-400">+50 marks</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-2">Part B</div>
            <div className="text-4xl font-black text-white mb-1">55 → 75</div>
            <div className="text-sm text-yellow-400">+20 marks</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-2">Total</div>
            <div className="text-4xl font-black text-white mb-1">190-210+</div>
            <div className="text-sm text-yellow-400">AIR &lt;30 Level</div>
          </div>
        </div>
        <p className="text-center text-white/80 mt-6 text-sm">
          With a good Part B, <span className="font-bold text-yellow-400">AIR &lt;15 is possible</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Click on any day to expand details | Click the circle to mark complete
        </p>
      </div>
    </div>
  );
};

export default UCEEDPreparationTracker;
