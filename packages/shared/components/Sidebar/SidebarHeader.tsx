import React from 'react'
import { X } from 'lucide-react'

interface SidebarHeaderProps {
    isMobile?: boolean
    onClose?: () => void
    brandName: string
    subtitle?: string
    accentColor?: string
    textColor?: string
    borderColor?: string
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    isMobile = false,
    onClose,
    brandName,
    subtitle,
    accentColor,
    textColor,
    borderColor,
}) => {
    return (
        <div
            className={`flex flex-shrink-0 items-center ${isMobile
                ? "justify-between p-6"
                : "px-6 mb-6"
                }`}
            style={{
                borderBottom: `${isMobile ? '1px' : '0px'} solid ${borderColor || 'transparent'}`,
            }}
        >
            <div>
                <h1 className="text-2xl font-black" style={{ color: accentColor }}>{brandName}</h1>
                {subtitle && (
                    <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: textColor, opacity: 0.6 }}>
                        {subtitle}
                    </p>
                )}
            </div>

            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                    style={{ color: textColor }}
                    onTouchStart={(e) => { if (textColor) e.currentTarget.style.color = textColor }}
                // Note: simplified touch logic, can be enhanced via props if needed
                >
                    <X className="w-8 h-8" />
                </button>
            )}
        </div>
    )
}

export default SidebarHeader
