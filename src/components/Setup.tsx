// src/components/Setup.tsx
import { useState, useEffect } from 'react'; // Import useEffect
import { CodeBlock } from './CodeBlock';
import { ProfileSelector } from './ProfileSelector';
import { PYTHON_SCRIPT_HTML, PYTHON_SCRIPT_TEXT } from '../constants';
import type { Package } from '../types';

interface SetupProps {
  onAnalyze: (packages: Package[], profiles: string[]) => void;
  onError: (message: string) => void;
}

export function Setup({ onAnalyze, onError }: SetupProps) {
  // Initialize state from localStorage, fallback to empty string
  const [packageData, setPackageData] = useState(
    () => localStorage.getItem('pysanPackageData') || ''
  );
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  
  // This effect runs whenever packageData changes, saving it to localStorage.
  useEffect(() => {
    localStorage.setItem('pysanPackageData', packageData);
  }, [packageData]);


  const handleAnalyzeClick = () => {
    if (selectedProfiles.length === 0) {
      onError('Error: Please select at least one project profile to get a recommendation.');
      return;
    }
    
    let installedPackages: Package[];
    try {
      if (!packageData) throw new Error("Empty data"); // Handle empty textarea
      installedPackages = JSON.parse(packageData);
      if (!Array.isArray(installedPackages) || (installedPackages.length > 0 && typeof installedPackages[0].name === 'undefined')) {
        throw new Error("Invalid format");
      }
      onError(''); // Clear previous error
    } catch {
      onError('Error: Invalid or empty data. Please copy the full, unmodified JSON output into the text box.');
      return;
    }
    
    onAnalyze(installedPackages, selectedProfiles);
  };
  
  return (
    <section>
      <div className="card">
        <div className="card-header">
          <div className="step-number">1</div>
          <div>
            <h2>Generate & Save Package Data</h2>
            <p>Run this script. A file dialog will open, allowing you to save your package data as a <code>.json</code> file.</p>
          </div>
        </div>
        <CodeBlock 
          id="python-script"
          codeText={PYTHON_SCRIPT_TEXT}
          codeHtml={PYTHON_SCRIPT_HTML}
          copyBtnTitle="Copy Code"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="step-number">2</div>
          <div>
            <h2>Open and Paste Your Data</h2>
            <p>Open the <code>.json</code> file you just saved, copy its entire contents, and then paste it into the text box below.</p>
          </div>
        </div>
        <textarea
          id="package-data"
          placeholder="Paste the JSON data from your saved file here..."
          value={packageData}
          onChange={(e) => setPackageData(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="step-number">3</div>
          <div>
            <h2>Select Your Project Profiles</h2>
            <p>Choose the fields you work in. This helps the advisor identify relevant packages.</p>
          </div>
        </div>
        <ProfileSelector selectedProfiles={selectedProfiles} onProfileChange={setSelectedProfiles} />
      </div>

      <div className="controls">
        <button id="analyzeBtn" className="button" onClick={handleAnalyzeClick}>
          <i className="fa-solid fa-wand-magic-sparkles"></i> Analyze Environment
        </button>
      </div>
    </section>
  );
}