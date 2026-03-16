import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-[var(--color-text-muted)]">
                <p>King James Version | Public Domain</p>
                <p>Crafted with React & Tailwind CSS.</p>
            </div>
        </footer>
    );
}