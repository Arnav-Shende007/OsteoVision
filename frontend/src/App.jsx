import React, { useState, useRef, useEffect } from 'react';
import './index.css';

const severityColors = {
  "Healthy": "#22C55E",
  "Doubtful": "#F59E0B",
  "Minimal": "#F97316",
  "Moderate": "#F5811F",
  "Severe": "#EF4444"
};

// ── SVG ICONS LIBRARY ──
const Icons = {
  Home: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  History: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Insights: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Patients: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Reports: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Settings: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Bell: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Sparkles: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Search: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Trash: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Download: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Share: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  ),
  Eye: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Info: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  AlertCircle: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  CheckCircle: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  User: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Activity: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Folder: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Plug: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18.36 6.64a9 9 0 0 1 0 12.73M6.01 6.01a9 9 0 0 0-1.5 1.5M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0-1.5 1.5" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
    </svg>
  ),
  LogOut: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
};

const findingIcons = {
  "Joint Space Narrowing": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 3a3 3 0 0 1 4 0h0a3 3 0 0 1 4 0v4H8V3Z" />
      <path d="M8 21a3 3 0 0 0 4 0h0a3 3 0 0 0 4 0v-4H8v4Z" />
      <path d="M12 7v10" strokeDasharray="2 2" />
      <path d="M6 12h12" />
    </svg>
  ),
  "Osteophyte Formation": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h18" />
      <path d="M12 3v18" />
      <path d="M7.5 7.5 16.5 16.5" />
      <path d="M16.5 7.5 7.5 16.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  "Sclerosis": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="23" />
      <line x1="1" y1="12" x2="23" y2="12" />
    </svg>
  ),
  "Alignment": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 3v16a2 2 0 0 0 2 2h16" />
      <path d="M5 17h4" />
      <path d="M5 13h6" />
      <path d="M5 9h4" />
      <path d="M5 5h12" />
    </svg>
  )
};

// ── INITIAL PRELOADED PATIENTS ──
const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    date: "May 20, 2026 · 10:30 AM",
    grade: "Minimal",
    probability: 24.0,
    klGrade: 2,
    knee: "Right Knee",
    results: {
      success: true,
      results: {
        grade: "Minimal",
        probability: 24.0,
        kl_grade: 2,
        description: "Minimal signs of osteoarthritis detected. Small osteophytes are present with possible joint space narrowing.",
        findings: {
          "Joint Space Narrowing": "Mild",
          "Osteophyte Formation": "Mild",
          "Sclerosis": "Normal",
          "Alignment": "Normal"
        },
        report_text: "Knee X-ray Analysis Report\nGenerated: May 20, 2026 10:30 AM\n\nPatient Name: John Doe\nSeverity Grade: Minimal\nOverall Severity: 24%\nKellgren-Lawrence Grade: 2\n\nSummary:\nMinimal signs of osteoarthritis detected. Small osteophytes are present with possible joint space narrowing.\n\nKey Findings:\n- Joint Space Narrowing: Mild\n- Osteophyte Formation: Mild\n- Sclerosis: Normal\n- Alignment: Normal",
        probabilities: {
          "Healthy": 65.0,
          "Doubtful": 10.0,
          "Minimal": 24.0,
          "Moderate": 1.0,
          "Severe": 0.0
        }
      },
      images: {
        input: "/img/minimal_xray.png",
        norm: "/img/minimal_xray.png",
        otsu: "/img/minimal_xray.png",
        morph: "/img/minimal_xray.png",
        roi: "/img/minimal_xray.png",
        gradcam: "/img/minimal_xray.png"
      }
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "May 18, 2026 · 02:15 PM",
    grade: "Moderate",
    probability: 52.0,
    klGrade: 3,
    knee: "Left Knee",
    results: {
      success: true,
      results: {
        grade: "Moderate",
        probability: 52.0,
        kl_grade: 3,
        description: "Moderate signs of osteoarthritis detected. There is noticeable joint space narrowing and presence of osteophytes.",
        findings: {
          "Joint Space Narrowing": "Moderate",
          "Osteophyte Formation": "Moderate",
          "Sclerosis": "Mild",
          "Alignment": "Normal"
        },
        report_text: "Knee X-ray Analysis Report\nGenerated: May 18, 2026 02:15 PM\n\nPatient Name: Jane Smith\nSeverity Grade: Moderate\nOverall Severity: 52%\nKellgren-Lawrence Grade: 3\n\nSummary:\nModerate signs of osteoarthritis detected. There is noticeable joint space narrowing and presence of osteophytes.\n\nKey Findings:\n- Joint Space Narrowing: Moderate\n- Osteophyte Formation: Moderate\n- Sclerosis: Mild\n- Alignment: Normal",
        probabilities: {
          "Healthy": 12.0,
          "Doubtful": 25.0,
          "Minimal": 11.0,
          "Moderate": 52.0,
          "Severe": 0.0
        }
      },
      images: {
        input: "/img/moderate_xray.png",
        norm: "/img/moderate_xray.png",
        otsu: "/img/moderate_xray.png",
        morph: "/img/moderate_xray.png",
        roi: "/img/moderate_xray.png",
        gradcam: "/img/moderate_xray.png"
      }
    }
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  // ── THEME STATE ──
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // ── DYNAMIC PATIENTS LIST STATE ──
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients_records');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  useEffect(() => {
    localStorage.setItem('patients_records', JSON.stringify(patients));
  }, [patients]);

  // ── PATIENTS FORM & DIRECTORY STATE ──
  const [patientName, setPatientName] = useState("");
  const [patientFile, setPatientFile] = useState(null);
  const [patientPreview, setPatientPreview] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const patientFileInputRef = useRef(null);

  // ── INTERACTIVE DROPDOWNS STATE ──
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "System Online",
      desc: "FastAPI server and Xception model loaded successfully.",
      time: "Just now",
      icon: <Icons.Plug style={{ width: 16, height: 16, color: 'var(--green)' }} />
    },
    {
      id: 2,
      title: "New Analysis Completed",
      desc: "Patient Jane Smith analysis completed.",
      time: "2 hours ago",
      icon: <Icons.Sparkles style={{ width: 16, height: 16, color: 'var(--blue)' }} />
    },
    {
      id: 3,
      title: "Report Downloaded",
      desc: "Knee X-ray PDF report downloaded.",
      time: "5 hours ago",
      icon: <Icons.Reports style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
    }
  ];

  // ── UPLOAD HANDLERS ──
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResults(null);
    }
  };

  const handlePatientFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setPatientFile(f);
      setPatientPreview(URL.createObjectURL(f));
    }
  };

  // ── ANALYSIS LOGIC ──
  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResults(data);

        // Save as patient record automatically
        const newPatient = {
          id: Date.now(),
          name: file.name.split('.')[0].replace(/[-_]/g, ' ') || "Quick Scan",
          date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          grade: data.results.grade,
          probability: data.results.probability,
          klGrade: data.results.kl_grade,
          knee: "Right Knee",
          results: data
        };
        setPatients(prev => [newPatient, ...prev]);
        setActiveTab('Insights');
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Analysis failed. Make sure backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientAnalyze = async () => {
    if (!patientFile || !patientName) return;
    setPatientLoading(true);

    const formData = new FormData();
    formData.append('file', patientFile);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        const newPatient = {
          id: Date.now(),
          name: patientName,
          date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          grade: data.results.grade,
          probability: data.results.probability,
          klGrade: data.results.kl_grade,
          knee: "Right Knee",
          results: data
        };

        setPatients(prev => [newPatient, ...prev]);
        setResults(data);

        // Reset patient form
        setPatientName("");
        setPatientFile(null);
        setPatientPreview(null);

        // Open Insights tab
        setActiveTab('Insights');
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Analysis failed. Make sure backend is running on port 8000.");
    } finally {
      setPatientLoading(false);
    }
  };

  // ── REPORTING LOGIC ──
  const downloadReport = async () => {
    if (!results) return;
    try {
      const res = await fetch('http://localhost:8000/download_pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_text: results.results.report_text })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "knee_xray_analysis_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  const downloadPatientReport = async (patient) => {
    if (!patient.results) return;
    try {
      const res = await fetch('http://localhost:8000/download_pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_text: patient.results.results.report_text })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${patient.name.toLowerCase().replace(/\s+/g, '_')}_knee_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  // ── VIEW INSIGHTS ──
  const viewPatientInsights = (patient) => {
    if (patient.results) {
      setResults(patient.results);
      setActiveTab('Insights');
    }
  };

  // ── DELETE PATIENT RECORD ──
  const handleDeletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  // ── DYNAMIC CALCULATIONS FOR REPORTS TAB ──
  const totalPatients = patients.length;
  const modOrSevereCount = patients.filter(p => p.grade === 'Moderate' || p.grade === 'Severe').length;
  const severityRate = totalPatients > 0 ? ((modOrSevereCount / totalPatients) * 100).toFixed(0) : '0';

  // ── FILTER DIRECTORY ──
  const filteredPatients = patients.filter(p => {
    const query = patientSearchQuery.toLowerCase();
    return p.name.toLowerCase().includes(query) || p.grade.toLowerCase().includes(query);
  });

  // Helper to handle base64 vs normal image URL preview rendering
  const renderImage = (imgSrc) => {
    if (!imgSrc) return '';
    if (imgSrc.startsWith('http') || imgSrc.startsWith('/') || imgSrc.startsWith('data:')) {
      return imgSrc;
    }
    return `data:image/png;base64,${imgSrc}`;
  };

  return (
    <div className="app-container">
      <div className="main-content-wrapper">

        {/* ── SIDEBAR ── */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <img src="/img/logo.png" alt="Logo" className="sidebar-logo-img" />
            <div className="sidebar-logo-text">
              <span className="logo-title">OSTEO<em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>VISION</em></span>
              <span className="logo-subtitle">Diagnostics</span>
            </div>
          </div>

          <div className="sidebar-nav">
            <button className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
              <Icons.Home className="nav-icon" />
              <span className="nav-label">Home</span>
            </button>
            <button className={`nav-item ${activeTab === 'Patients' ? 'active' : ''}`} onClick={() => setActiveTab('Patients')}>
              <Icons.Patients className="nav-icon" />
              <span className="nav-label">Patients</span>
            </button>
            <button className={`nav-item ${activeTab === 'Insights' ? 'active' : ''}`} onClick={() => setActiveTab('Insights')}>
              <Icons.Insights className="nav-icon" />
              <span className="nav-label">Insights</span>
            </button>
            <button className={`nav-item ${activeTab === 'History' ? 'active' : ''}`} onClick={() => setActiveTab('History')}>
              <Icons.History className="nav-icon" />
              <span className="nav-label">History</span>
            </button>
            <button className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`} onClick={() => setActiveTab('Reports')}>
              <Icons.Reports className="nav-icon" />
              <span className="nav-label">Reports</span>
            </button>
            <button className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}>
              <Icons.Settings className="nav-icon" />
              <span className="nav-label">Settings</span>
            </button>
          </div>

          <div className="sidebar-bottom">
            <div className="promo-card">
              <span className="promo-collapsed-badge">AI</span>
              <div className="promo-card-content">
                <div className="promo-icon">
                  <Icons.Sparkles style={{ width: 20, height: 20, color: 'var(--blue)' }} />
                </div>
                <div className="promo-title">AI-Powered Analysis</div>
                <p className="promo-desc">Advanced deep learning models for early detection and better outcomes.</p>
              </div>
            </div>

            <div className="doc-profile">
              <img src="public/img/pigeon_doc.png" className="doc-avatar" alt="Dr. Aryan Medigeri" />
              <div className="doc-info">
                <div className="doc-name">Dr. Aryan Medigeri</div>
                <div className="doc-role">Orthopedic Surgeon</div>
              </div>
              <span className="doc-arrow">
                <Icons.ChevronDown style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </span>
            </div>
          </div>
        </nav>

        {/* ── MAIN AREA ── */}
        <main className="main-area">
          {/* Header Actions */}
          <div className="header-actions">
            <div className="notif-bell" onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowProfileDropdown(false);
            }}>
              <Icons.Bell style={{ width: 20, height: 20, color: 'var(--text-dark)' }} />
              <span className="notif-badge">{notifications.length}</span>

              {showNotifDropdown && (
                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">Notifications</div>
                  <div className="notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className="notif-item">
                        <div className="notif-icon">{n.icon}</div>
                        <div className="notif-content">
                          <span className="notif-title">{n.title}</span>
                          <span className="notif-desc">{n.desc}</span>
                          <span className="notif-time">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="user-profile" onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifDropdown(false);
            }}>
              <div className="user-avatar">AM</div>
              <span className="user-arrow">
                <Icons.ChevronDown style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </span>

              {showProfileDropdown && (
                <div className="dropdown-menu profile-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">Dr. Aryan Medigeri</div>
                  <div className="profile-dropdown-item" onClick={() => { setActiveTab('Settings'); setShowProfileDropdown(false); }}>
                    <Icons.Settings style={{ width: 16, height: 16 }} />
                    Settings
                  </div>
                  <div className="profile-dropdown-item" onClick={() => { setActiveTab('Home'); setShowProfileDropdown(false); }}>
                    <Icons.Home style={{ width: 16, height: 16 }} />
                    Home
                  </div>
                  <div className="profile-dropdown-item logout" onClick={() => { alert("Logging out..."); setShowProfileDropdown(false); }}>
                    <Icons.LogOut style={{ width: 16, height: 16 }} />
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="block-container">

            {/* ═══ HOME TAB ═══ */}
            {activeTab === 'Home' && (
              <div className="home-split-layout fade-in">
                {/* Left Side: Content */}
                <div className="home-left">
                  <div className="home-header">
                    <h1 className="home-title">Knee <span style={{ color: 'var(--blue)' }}>X-ray</span> Analysis</h1>
                    <p className="home-subtitle">AI-powered insights for better knee health</p>
                  </div>

                  {/* Feature Cards Row */}
                  <div className="feature-cards">
                    <div className="feature-card">
                      <div className="feature-icon feature-icon--blue">
                        <Icons.CheckCircle style={{ width: 18, height: 18 }} />
                      </div>
                      <div>
                        <div className="feature-title">Accurate Results</div>
                        <div className="feature-desc">High precision analysis</div>
                      </div>
                    </div>

                    <div className="feature-card">
                      <div className="feature-icon feature-icon--blue">
                        <Icons.Sparkles style={{ width: 18, height: 18 }} />
                      </div>
                      <div>
                        <div className="feature-title">Fast Processing</div>
                        <div className="feature-desc">Results in seconds</div>
                      </div>
                    </div>
                    <div className="feature-card">
                      <div className="feature-icon feature-icon--blue">
                        <Icons.Plug style={{ width: 18, height: 18 }} />
                      </div>
                      <div>
                        <div className="feature-title">Secure & Private</div>
                        <div className="feature-desc">Your data is safe</div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                    <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="upload-circle">
                      <Icons.Download style={{ width: 22, height: 22 }} />
                    </div>
                    <div className="upload-title">Upload Knee X-ray</div>
                    <div className="upload-formats">JPG or PNG</div>

                    <button className="btn-primary" style={{ width: 'auto', minWidth: '150px', padding: '0.6rem 2.2rem', margin: '0 auto 0.6rem' }} onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                      Choose File
                    </button>

                    <div className="upload-note">or drag and drop your file here</div>
                  </div>

                  {/* Preview Section */}
                  {preview && (
                    <div className="preview-section fade-in">
                      <img src={preview} alt="Preview" className="preview-img" />
                      <button className="btn-primary btn-analyze" onClick={handleAnalyze} disabled={loading}>
                        {loading ? (
                          <span className="btn-loading">
                            <span className="spinner"></span> Analyzing...
                          </span>
                        ) : (
                          <>
                            <Icons.Sparkles style={{ width: 18, height: 18 }} />
                            Analyze X-Ray
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Recent Analyses Row (Dynamic) */}
                  <div className="recent-analyses-container">
                    <div className="history-header">
                      <h3>Recent Analyses</h3>
                      <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); setActiveTab('History'); }}>View All</a>
                    </div>

                    {patients.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', padding: '1rem 0' }}>
                        No recent analyses.
                      </div>
                    ) : (
                      patients.slice(0, 2).map(patient => (
                        <div key={patient.id} className="recent-row" onClick={() => viewPatientInsights(patient)}>
                          <div className="recent-thumb">
                            <img src={patient.results ? renderImage(patient.results.images.input) : '/img/minimal_xray.png'} alt={patient.name} />
                          </div>
                          <div className="recent-meta">
                            <div className="recent-date">{patient.date}</div>
                            <div className="recent-knee">{patient.name} · {patient.knee}</div>
                          </div>
                          <div className={`recent-badge ${patient.grade.toLowerCase()}`} style={{
                            background: severityColors[patient.grade] + '20',
                            color: severityColors[patient.grade]
                          }}>
                            {patient.grade} ({patient.probability.toFixed(0)}%)
                          </div>
                          <div className="recent-arrow">
                            <Icons.ChevronRight style={{ width: 16, height: 16 }} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Side: Huge Knee Image occupying full vertical height */}
                <div className="home-right">
                  <img src="/img/hero_knee.png" className="full-hero-img" alt="" />
                </div>
              </div>
            )}

            {/* ═══ PATIENTS TAB ═══ */}
            {activeTab === 'Patients' && (
              <div className="patients-layout fade-in">
                {/* Form Column */}
                <div className="patients-form-col">
                  <h3 style={{ marginBottom: '0.3rem', fontWeight: 800 }}>Analyze Patient</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                    Enter patient details and upload an X-ray to perform AI analysis.
                  </p>

                  <div className="form-group">
                    <label htmlFor="patient-name">Patient Name</label>
                    <input
                      id="patient-name"
                      type="text"
                      className="form-input"
                      placeholder="Enter patient full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>X-Ray Image</label>
                    <div className="upload-area" style={{ minHeight: '180px', padding: '1.2rem 1rem' }} onClick={() => patientFileInputRef.current?.click()}>
                      <input
                        ref={patientFileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handlePatientFileChange}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-circle" style={{ width: 44, height: 44, marginBottom: '0.6rem' }}>
                        <Icons.Download style={{ width: 18, height: 18 }} />
                      </div>
                      <div className="upload-title" style={{ fontSize: '0.95rem' }}>Upload Image</div>
                      <div className="upload-formats" style={{ marginBottom: '0.8rem', fontSize: '0.78rem' }}>JPG or PNG</div>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
                        onClick={(e) => { e.stopPropagation(); patientFileInputRef.current?.click(); }}
                      >
                        Choose File
                      </button>
                    </div>
                  </div>

                  {patientPreview && (
                    <div className="preview-section fade-in" style={{ maxWidth: '100%', margin: '1rem 0 0' }}>
                      <img src={patientPreview} alt="Patient X-ray Preview" className="preview-img" style={{ maxHeight: '180px', width: '100%', objectFit: 'contain' }} />
                    </div>
                  )}

                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1.5rem', padding: '0.7rem' }}
                    onClick={handlePatientAnalyze}
                    disabled={patientLoading || !patientName || !patientFile}
                  >
                    {patientLoading ? (
                      <span className="btn-loading">
                        <span className="spinner"></span> Analyzing...
                      </span>
                    ) : (
                      <>
                        <Icons.Sparkles style={{ width: 18, height: 18 }} />
                        Analyze Patient
                      </>
                    )}
                  </button>
                </div>

                {/* List Directory Column */}
                <div className="patients-list-col">
                  <div className="history-header">
                    <h3 style={{ fontWeight: 800 }}>Patient Directory</h3>
                  </div>

                  {/* Search bar */}
                  <div className="patients-search">
                    <span className="patients-search-icon">
                      <Icons.Search style={{ width: 16, height: 16 }} />
                    </span>
                    <input
                      type="text"
                      className="patients-search-input"
                      placeholder="Search patients by name or severity..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Patients Table */}
                  <div className="patients-table-container">
                    <table className="patients-table">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Date Added</th>
                          <th>Severity</th>
                          <th>Knee</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.length === 0 ? (
                          <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                              No patient records match the search.
                            </td>
                          </tr>
                        ) : (
                          filteredPatients.map(patient => (
                            <tr key={patient.id}>
                              <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="patient-avatar-placeholder">
                                  {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                </div>
                                <span style={{ fontWeight: '700' }}>{patient.name}</span>
                              </td>
                              <td>{patient.date}</td>
                              <td>
                                <span className={`recent-badge ${patient.grade.toLowerCase()}`} style={{
                                  background: severityColors[patient.grade] + '18',
                                  color: severityColors[patient.grade]
                                }}>
                                  {patient.grade} ({patient.probability.toFixed(0)}%)
                                </span>
                              </td>
                              <td>{patient.knee}</td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.3rem' }}>
                                  <button className="patient-action-btn" onClick={() => viewPatientInsights(patient)} title="View in Insights">
                                    <Icons.Eye style={{ width: 14, height: 14 }} />
                                    View
                                  </button>
                                  <button className="patient-action-btn" onClick={() => downloadPatientReport(patient)} title="Download PDF Report">
                                    <Icons.Download style={{ width: 14, height: 14 }} />
                                    PDF
                                  </button>
                                  <button className="patient-action-btn" style={{ color: 'var(--red)' }} onClick={() => handleDeletePatient(patient.id)} title="Delete Record">
                                    <Icons.Trash style={{ width: 14, height: 14 }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ INSIGHTS TAB ═══ */}
            {activeTab === 'Insights' && (
              <div className="fade-in">
                {!results ? (
                  <div className="empty-state">
                    <div className="empty-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
                      <Icons.Insights style={{ width: 52, height: 52, color: 'var(--text-muted)' }} />
                    </div>
                    <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No Analysis Available</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Please upload and analyze a knee X-ray on the Home or Patients tab first.</p>
                    <button className="btn-primary" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={() => setActiveTab('Home')}>Go to Home</button>
                  </div>
                ) : (
                  <>
                    <div className="insights-header">
                      <div className="insights-header-icon">
                        <Icons.Sparkles style={{ width: 24, height: 24, color: 'var(--blue)' }} />
                      </div>
                      <div>
                        <h2 style={{ marginBottom: '0.2rem', fontWeight: 900 }}>Knee Osteoarthritis Severity Analysis</h2>
                        <p className="insights-subtitle">Deterministic ROI Extraction • Xception CNN • Deep Learning Classification</p>
                      </div>
                    </div>

                    <div className="columns">
                      <div className="col-left">
                        <div className="step-header">
                          <span className="step-badge">Step 1</span>
                          <h3 style={{ margin: 0, fontWeight: 800 }}>ROI Extraction Pipeline</h3>
                        </div>
                        <p className="step-desc">Deterministic classical image processing – no training data required.</p>

                        <div className="pipeline-row">
                          <div className="pipeline-card">
                            <img src={renderImage(results.images.input)} alt="Input" />
                            <p>Input X-Ray</p>
                          </div>
                          <div className="pipeline-arrow">›</div>
                          <div className="pipeline-card">
                            <img src={renderImage(results.images.norm)} alt="Normalized" />
                            <p>Normalized</p>
                          </div>
                          <div className="pipeline-arrow">›</div>
                          <div className="pipeline-card">
                            <img src={renderImage(results.images.otsu)} alt="Otsu" />
                            <p>Otsu Threshold</p>
                          </div>
                          <div className="pipeline-arrow">›</div>
                          <div className="pipeline-card">
                            <img src={renderImage(results.images.morph)} alt="Morph" />
                            <p>Morphological Closing</p>
                          </div>
                          <div className="pipeline-arrow">›</div>
                          <div className="pipeline-card">
                            <img src={renderImage(results.images.roi)} alt="ROI" />
                            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              Extracted ROI
                              <span className="checkmark" style={{ display: 'inline-flex' }}>
                                <Icons.CheckCircle style={{ width: 12, height: 12, color: 'var(--green)' }} />
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="step-header" style={{ marginTop: '2.5rem' }}>
                          <span className="step-badge step-badge--purple">Step 2</span>
                          <h3 style={{ margin: 0, fontWeight: 800 }}>OA Severity Classification</h3>
                        </div>
                        <p className="step-desc">Transfer learning with fine-tuned convolutional neural network architecture.</p>

                        <div className="classification-row">
                          <div className="classification-card">
                            <h4 style={{ fontWeight: 800 }}>Input to CNN (ROI)</h4>
                            <div className="xray-img-wrap">
                              <img src={renderImage(results.images.roi)} alt="ROI" />
                            </div>
                          </div>
                          <div className="classification-card">
                            <h4 style={{ fontWeight: 800 }}>Grad-CAM Explainability</h4>
                            <div className="xray-img-wrap">
                              <img src={renderImage(results.images.gradcam)} alt="Grad-CAM" />
                            </div>
                          </div>
                        </div>

                        <div className="pipeline-footer">
                          Framework: Deterministic ROI Extraction • Xception CNN Model
                        </div>
                      </div>

                      <div className="col-right">
                        <div className="analysis-panel">
                          <div className="panel-header">
                            <button className="panel-back" onClick={() => setActiveTab('Home')} title="Go back">
                              <Icons.ArrowLeft style={{ width: 16, height: 16 }} />
                            </button>
                            <h3 style={{ margin: 0, fontWeight: 800 }}>Analysis Result</h3>
                            <div style={{ width: 30 }}></div>
                          </div>

                          <div className="severity-section">
                            <div className="severity-info">
                              <div className="sev-overview-label">Severity Overview</div>
                              <div className="sev-value" style={{ color: severityColors[results.results.grade] }}>
                                {results.results.grade}
                              </div>
                              <div className="sev-pct" style={{ color: severityColors[results.results.grade] }}>
                                {results.results.probability.toFixed(1)}% Confidence
                              </div>
                              <div className="kl-info">
                                <span className="kl-label">Kellgren–Lawrence Grade</span>
                                <span className="kl-value" style={{ color: severityColors[results.results.grade] }}>{results.results.kl_grade}</span>
                              </div>
                              <p className="sev-desc">{results.results.description}</p>
                            </div>
                            <div className="mini-ring-wrap">
                              <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke={severityColors[results.results.grade]} strokeWidth="8" strokeLinecap="round" strokeDasharray="282" strokeDashoffset={282 - (results.results.probability / 100) * 282} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                              </svg>
                              <div className="ring-center">
                                <span className="ring-pct" style={{ color: 'var(--text-dark)' }}>{results.results.probability.toFixed(0)}%</span>
                                <span className="ring-sub">Confidence</span>
                              </div>
                            </div>
                          </div>

                          <div className="prob-section">
                            <h4 style={{ fontWeight: 800 }}>Class Probability Distribution</h4>
                            {Object.entries(results.results.probabilities).map(([name, val]) => (
                              <div key={name} className="prob-bar-row">
                                <div className="prob-name">{name}</div>
                                <div className="prob-track">
                                  <div className="prob-fill" style={{ width: `${val}%`, background: severityColors[name] || '#ccc' }}></div>
                                </div>
                                <div className="prob-val">{val.toFixed(1)}%</div>
                              </div>
                            ))}
                          </div>

                          <div className="findings-section">
                            <h4 style={{ fontWeight: 800 }}>Key Findings</h4>
                            {Object.entries(results.results.findings).map(([name, status]) => {
                              const FindingIcon = findingIcons[name] || Icons.Sparkles;
                              return (
                                <div key={name} className="find-row">
                                  <div className="find-ico">
                                    <FindingIcon style={{ width: 16, height: 16 }} />
                                  </div>
                                  <div className="find-name">{name}</div>
                                  <div className={`find-status fs-${status}`}>{status}</div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="action-buttons">
                            <button className="btn-outline" onClick={() => {
                              const subject = "Knee X-ray Analysis Report";
                              const body = encodeURIComponent(results.results.report_text);
                              window.location.href = `mailto:?subject=${subject}&body=${body}`;
                            }}>
                              <Icons.Share style={{ width: 18, height: 18 }} />
                              Share
                            </button>
                            <button className="btn-download" onClick={downloadReport}>
                              <Icons.Download style={{ width: 18, height: 18 }} />
                              Download PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ═══ HISTORY TAB ═══ */}
            {activeTab === 'History' && (
              <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="history-header">
                  <h3 style={{ fontWeight: 800 }}>Analysis History</h3>
                </div>

                {patients.length === 0 ? (
                  <div className="empty-state">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icons.History style={{ width: 48, height: 48, color: 'var(--text-muted)' }} />
                    </div>
                    <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No Analysis History</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Analyze patient files to compile diagnostic history.</p>
                  </div>
                ) : (
                  patients.map(patient => (
                    <div key={patient.id} className="recent-row" style={{ paddingRight: '1.5rem' }} onClick={() => viewPatientInsights(patient)}>
                      <div className="recent-thumb">
                        <img src={patient.results ? renderImage(patient.results.images.input) : '/img/minimal_xray.png'} alt={patient.name} />
                      </div>
                      <div className="recent-meta">
                        <div className="recent-date">{patient.date}</div>
                        <div className="recent-knee" style={{ fontWeight: 800 }}>{patient.name} · {patient.knee}</div>
                      </div>
                      <div className={`recent-badge ${patient.grade.toLowerCase()}`} style={{
                        background: severityColors[patient.grade] + '20',
                        color: severityColors[patient.grade]
                      }}>
                        {patient.grade} ({patient.probability.toFixed(0)}%)
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '1rem', marginRight: '0.5rem' }} onClick={e => e.stopPropagation()}>
                        <button className="patient-action-btn" onClick={() => downloadPatientReport(patient)} title="Download PDF Report">
                          <Icons.Download style={{ width: 14, height: 14 }} />
                        </button>
                        <button className="patient-action-btn" style={{ color: 'var(--red)' }} onClick={() => handleDeletePatient(patient.id)} title="Delete Record">
                          <Icons.Trash style={{ width: 14, height: 14 }} />
                        </button>
                      </div>

                      <div className="recent-arrow">
                        <Icons.ChevronRight style={{ width: 16, height: 16 }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ═══ REPORTS TAB ═══ */}
            {activeTab === 'Reports' && (
              <div className="reports-layout fade-in">
                <div className="reports-stats-grid">
                  <div className="stat-card">
                    <div className="stat-val">{totalPatients}</div>
                    <div className="stat-label">Total Analyzed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-val">{severityRate}%</div>
                    <div className="stat-label">Severity Rate</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-val">1.8s</div>
                    <div className="stat-label">Avg. Processing</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-val">96.8%</div>
                    <div className="stat-label">Model Accuracy</div>
                  </div>
                </div>

                <div className="history-header">
                  <h3 style={{ fontWeight: 800 }}>Diagnostic Reports</h3>
                </div>

                <div className="reports-grid">
                  {patients.length === 0 ? (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Icons.Reports style={{ width: 48, height: 48, color: 'var(--text-muted)' }} />
                      </div>
                      <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No Reports Available</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>Analyze patient files to compile clinical reports.</p>
                    </div>
                  ) : (
                    patients.map(patient => (
                      <div key={patient.id} className="report-card">
                        <div className="report-card-top">
                          <div className="report-card-icon">
                            <Icons.Reports style={{ width: 22, height: 22 }} />
                          </div>
                          <div className="report-card-meta">
                            <h4 style={{ fontWeight: 800 }}>{patient.name}</h4>
                            <p style={{ fontWeight: 600 }}>{patient.date} · {patient.knee}</p>
                          </div>
                        </div>
                        <div className="report-card-summary">
                          <strong>Diagnosis:</strong> {patient.grade} Osteoarthritis ({patient.probability.toFixed(0)}% Confidence)
                          <br />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            Kellgren-Lawrence Grade {patient.klGrade}
                          </span>
                        </div>
                        <div className="report-card-actions">
                          <button className="patient-action-btn" onClick={() => viewPatientInsights(patient)}>
                            <Icons.Eye style={{ width: 14, height: 14 }} />
                            View Insights
                          </button>
                          <button className="patient-action-btn" onClick={() => downloadPatientReport(patient)}>
                            <Icons.Download style={{ width: 14, height: 14 }} />
                            PDF
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ═══ SETTINGS TAB ═══ */}
            {activeTab === 'Settings' && (
              <div className="settings-container fade-in">
                <h4 className="settings-section-title">Application Settings</h4>

                <div className="settings-row">
                  <div className="settings-meta">
                    <h5>Dark Mode</h5>
                    <p>Toggle the dashboard between light and dark themes</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={theme === 'dark'}
                      onChange={toggleTheme}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="settings-row">
                  <div className="settings-meta">
                    <h5>System Health Alerts</h5>
                    <p>Receive notifications for critical diagnostic events</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="settings-row">
                  <div className="settings-meta">
                    <h5>Automatic PDF Generation</h5>
                    <p>Automatically compile and save reports post-analysis</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <h4 className="settings-section-title" style={{ marginTop: '2rem' }}>About System</h4>
                <div style={{ padding: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Model Version:</strong> Xception-FT v2.1 (Deep Learning Classification)</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>ROI Extractor:</strong> Deterministic Classical Image Pipeline</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Doctor Assigned:</strong> Dr. Aryan Medigeri</p>
                  <p><strong>Status:</strong> Connected to Local Server (Port 8000)</p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
