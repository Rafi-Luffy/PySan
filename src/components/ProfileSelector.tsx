// src/components/ProfileSelector.tsx
import type { ChangeEvent } from 'react';

interface ProfileSelectorProps {
    selectedProfiles: string[];
    onProfileChange: (profiles: string[]) => void;
}

const profileDisplayNames: { [key: string]: string } = {
    data_science: "Data Science & Analysis",
    machine_learning: "Machine Learning & AI",
    web_dev_backend: "Web Development (Backend)",
    web_dev_frontend: "Web Development (Frontend Tools)",
    automation_scripting: "Automation & Scripting",
    data_engineering: "Data Engineering & Big Data",
    devops_cloud: "DevOps & Cloud Infrastructure",
    desktop_gui: "Desktop GUI Development",
    testing: "Software Testing",
    scientific_computing: "Scientific & Numeric Computing",
    game_dev: "Game Development",
};


export function ProfileSelector({ selectedProfiles, onProfileChange }: ProfileSelectorProps) {
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newProfiles = checked
            ? [...selectedProfiles, value]
            : selectedProfiles.filter(profile => profile !== value);
        onProfileChange(newProfiles);
    };

    return (
        <div id="profile-selection">
            {Object.keys(profileDisplayNames).map(profileKey => (
                <label className="profile-label" key={profileKey}>
                    <input
                        type="checkbox"
                        name="profile"
                        value={profileKey}
                        checked={selectedProfiles.includes(profileKey)}
                        onChange={handleCheckboxChange}
                    />
                    <span>{profileDisplayNames[profileKey]}</span>
                </label>
            ))}
        </div>
    );
}