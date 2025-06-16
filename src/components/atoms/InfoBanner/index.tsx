import React from 'react';

interface InfoBannerProps {
    children: React.ReactNode;
    className?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-purple-100 text-primary p-3 rounded-md text-center ${className}`}>
            {children}
        </div>
    );
};

export default InfoBanner;