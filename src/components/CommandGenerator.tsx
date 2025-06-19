// src/components/CommandGenerator.tsx
import { useState, useEffect } from 'react'; // Import useEffect
import type { Package } from '../types';
import { CodeBlock } from './CodeBlock';

interface CommandGeneratorProps {
  packagesToRemove: Package[];
}

export function CommandGenerator({ packagesToRemove }: CommandGeneratorProps) {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isCardDismissed, setIsCardDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOS, setSelectedOS] = useState<'unix' | 'windows' | ''>('');
  const [command, setCommand] = useState('');

  // This effect creates a 4-second timer to show the card.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardVisible(true);
    }, 4000);

    // This is a cleanup function. It runs if the component is removed
    // from the screen, preventing memory leaks.
    return () => clearTimeout(timer);
  }, []); // The empty array [] means this effect runs only once.


  if (isCardDismissed || packagesToRemove.length === 0) {
    return null;
  }
  
  const generateCommand = (os: 'unix' | 'windows') => {
    const packageListString = packagesToRemove.map(p => p.name).join(' ');
    const newCommand = os === 'unix'
      ? `echo "${packageListString}" | xargs pip uninstall -y`
      : `pip uninstall -y ${packageListString}`;
    
    setSelectedOS(os);
    setCommand(newCommand);
  };

  const handleYesClick = () => {
    setShowDetails(true);
  };
  
  const handleNoClick = () => {
    setIsCardDismissed(true);
  };

  return (
    // Use the class selector and conditionally add the 'visible' class
    <div className={`command-card card ${isCardVisible ? 'visible' : ''}`}>
        {!showDetails && (
             <div id="cleanup-prompt">
                <h3><i className="fa-solid fa-broom"></i> Ready to clean up?</h3>
                <div className="prompt-buttons">
                    <button id="cleanup-yes-btn" className="button prompt-button" onClick={handleYesClick}>Yes, show me how</button>
                    <button id="cleanup-no-btn" className="button prompt-button" onClick={handleNoClick}>No, thanks</button>
                </div>
            </div>
        )}
        <div id="cleanup-details" className={showDetails ? 'visible' : ''}>
            <h4>Generate Uninstall Command</h4>
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                Select your OS to create a command to remove all packages in the "Review" list.
            </p>
            <div id="os-selection">
                <label className="os-label">
                    <input type="radio" name="os" value="unix" checked={selectedOS === 'unix'} onChange={() => generateCommand('unix')} /> macOS / Linux
                </label>
                <label className="os-label">
                    <input type="radio" name="os" value="windows" checked={selectedOS === 'windows'} onChange={() => generateCommand('windows')} /> Windows
                </label>
            </div>
            {command && (
                 <CodeBlock 
                    id="uninstall-command-block"
                    codeText={command}
                    codeHtml={command}
                    copyBtnTitle="Copy Command"
                 />
            )}
            <div className="disclaimer">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <strong>Warning:</strong> This is a powerful command. Run it in a terminal within the correct Python environment. Always double-check the list before proceeding.
            </div>
        </div>
    </div>
  );
}