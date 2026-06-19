import React from 'react';

const Spinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100/50 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                {/* Outer track */}
                <div className="w-16 h-16 border-4 border-base-300 rounded-full"></div>
                {/* Rotating gradient loader */}
                <div className="absolute w-16 h-16 border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Spinner;