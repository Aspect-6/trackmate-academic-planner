import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { APP_NAME } from '@/app/config/brand'
import { GLOBAL } from '@/app/styles/colors'

interface SidebarHeaderProps {
    isMobile: boolean
    onClose?: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isMobile, onClose }) => {
    return (
        <div
            className={cn(
                "flex flex-shrink-0 items-center",
                isMobile
                    ? "justify-between p-6 border-b"
                    : "px-6 mb-6"
            )}
            style={{
                borderBottomColor: GLOBAL.SIDEBAR_BORDER,
                borderBottomStyle: 'solid',
                borderBottomWidth: isMobile ? '1px' : '0px'
            }}
        >
            <h1 className="text-2xl font-black" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>{APP_NAME}</h1>

            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                    style={{ color: GLOBAL.SIDEBAR_CLOSE_ICON }}
                    onTouchStart={(e) => e.currentTarget.style.color = GLOBAL.SIDEBAR_CLOSE_ICON_HOVER}
                    onTouchEnd={(e) => e.currentTarget.style.color = GLOBAL.SIDEBAR_CLOSE_ICON}
                >
                    <X className="w-8 h-8" />
                </button>
            )}
        </div>
    )
}

export default SidebarHeader
