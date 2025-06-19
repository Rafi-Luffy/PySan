// src/components/PackageList.tsx
import type { Package } from '../types/index';
import { formatSize } from '../utils/helpers';

interface PackageListProps {
  title: string;
  icon: string;
  packages: Package[];
}

export function PackageList({ title, icon, packages }: PackageListProps) {
  return (
    <div className="results-column">
      <h3>
        <i className={icon}></i> {title} ({packages.length})
      </h3>
      <ul className="package-list">
        {packages.map(pkg => (
          <li key={pkg.name} className="package-list-item">
            <div className="package-info">
              <span className="package-name">{pkg.name}</span>
              <span className="package-version">v{pkg.version || 'N/A'}</span>
            </div>
            <span className="package-size">{formatSize(pkg.size)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}