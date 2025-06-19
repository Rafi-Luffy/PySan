// src/App.tsx
import { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import { Setup } from './components/Setup';
import { Results } from './components/Results';
import { PACKAGE_PROFILES } from './constants';
import type { Package, AnalysisResult } from './types';

function App() {
  const [view, setView] = useState<'setup' | 'results'>('setup');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Create a ref to attach to the results container
  const resultsRef = useRef<HTMLDivElement>(null);

  // This effect will run when the 'view' changes to 'results'
  useEffect(() => {
    if (view === 'results' && resultsRef.current) {
      // Scroll the top of the results container into view
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [view]);


  const handleAnalyze = (installedPackages: Package[], selectedProfiles: string[]) => {
    const packagesToKeepSet = new Set(PACKAGE_PROFILES.core);
    selectedProfiles.forEach(profile => {
        (PACKAGE_PROFILES[profile] || []).forEach(pkg => packagesToKeepSet.add(pkg));
    });

    const keepResults: Package[] = [];
    const removeResults: Package[] = [];
    let totalKeepSize = 0;
    let totalRemoveSize = 0;

    installedPackages.forEach(pkg => {
        const pkgName = pkg.name.toLowerCase().replace(/_/g, '-');
        let shouldKeep = false;
        
        if (packagesToKeepSet.has(pkgName)) {
            shouldKeep = true;
        } else {
            for (const keepPkg of packagesToKeepSet) {
                if (pkgName.startsWith(keepPkg)) { shouldKeep = true; break; }
            }
        }

        if (shouldKeep) {
          keepResults.push(pkg);
          totalKeepSize += (pkg.size || 0);
        } else {
          removeResults.push(pkg);
          totalRemoveSize += (pkg.size || 0);
        }
    });

    keepResults.sort((a,b) => (b.size || 0) - (a.size || 0));
    removeResults.sort((a,b) => (b.size || 0) - (a.size || 0));

    setAnalysisResult({
      keep: keepResults,
      remove: removeResults,
      stats: {
        totalPackages: installedPackages.length,
        keepSize: totalKeepSize,
        removeSize: totalRemoveSize,
      }
    });
    
    setView('results');
    // NOTE: The scrolling logic is now handled by the useEffect hook
  };
  
  const handleReset = () => {
    setView('setup');
    setAnalysisResult(null);
    setErrorMessage('');
    // Clear the remembered data when user clicks "Analyze Again"
    localStorage.removeItem('pysanPackageData');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <header>
        <h1>PySan</h1>
        <p>Clarity, balance, and control — your Python environment, reimagined.</p>
      </header>
      
      <main>
        {view === 'setup' && (
          <Setup onAnalyze={handleAnalyze} onError={setErrorMessage} />
        )}
        {/* We wrap the Results component in a div to attach our ref */}
        {view === 'results' && analysisResult && (
          <div ref={resultsRef}>
            <Results result={analysisResult} onReset={handleReset} />
          </div>
        )}
        {errorMessage && <div id="error-message">{errorMessage}</div>}
      </main>
      
      <footer>
        <p>A fully client-side tool. Your data never leaves your browser.</p>
        <p>Built with ❤️ by Rafi S. B. M.</p>
      </footer>
    </div>
  )
}

export default App;