// src/components/Results.tsx
import type { AnalysisResult } from '../types';
import { formatSize } from '../utils/helpers';
import { PackageList } from './PackageList';
import { CommandGenerator } from './CommandGenerator';

interface ResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function Results({ result, onReset }: ResultsProps) {
  const { stats, keep, remove } = result;
  
  return (
    <section>
      <div className="card">
        <div id="results-summary">
          <div className="summary-box">
            <div className="label">Total Packages Analyzed</div>
            <div className="value">{stats.totalPackages}</div>
          </div>
          <div className="summary-box">
            <div className="label">Essential Packages</div>
            <div className="value keep">{formatSize(stats.keepSize)}</div>
          </div>
          <div className="summary-box">
            <div className="label">Space to Reclaim</div>
            <div className="value remove">{formatSize(stats.removeSize)}</div>
          </div>
        </div>
        <div id="results-details">
          <PackageList title="Packages to Keep" icon="fa-solid fa-circle-check keep-icon" packages={keep} />
          <PackageList title="Packages to Review" icon="fa-solid fa-trash-can remove-icon" packages={remove} />
        </div>
      </div>

      <CommandGenerator packagesToRemove={remove} />
      
      <div className="card">
        <h4><i className="fa-solid fa-circle-info"></i> Notes & Limitations</h4>
        <p className="text-secondary" style={{ fontSize: '0.9rem', margin: 0 }}>
          The "Frontend Development Tools" profile identifies Python packages often used in conjunction with frontend work (e.g., for serving static files or API interactions). It does not scan your <code>node_modules</code> directory or detect JavaScript libraries like React or Vue.
        </p>
      </div>
      
      <div className="controls">
        <button className="button" onClick={onReset}>
          <i className="fa-solid fa-arrow-rotate-left"></i> Analyze Again
        </button>
      </div>
    </section>
  );
}