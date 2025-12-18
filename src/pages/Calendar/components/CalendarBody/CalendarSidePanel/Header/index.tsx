import React from 'react';

interface HeaderContainerProps {
    children: React.ReactNode;
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => (
    <div className="flex justify-between items-center mb-6">
        {children}
    </div>
);

export default HeaderContainer;
