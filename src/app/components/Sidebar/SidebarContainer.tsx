import React from 'react'
import { cn } from '@/app/lib/utils'
import { GLOBAL } from '@/app/styles/colors'

interface SidebarContainerProps {
    isMobile: boolean
    children: React.ReactNode
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ isMobile, children }) => {
    return (
        <nav
            className={cn(
                "flex flex-col",
                isMobile
                    ? "fixed inset-0 z-50 bg-[#0d1117]"
                    : "sidebar w-64 flex-shrink-0 border-r sticky top-0 h-screen py-8 hidden lg:flex"
            )}
            style={{
                backgroundColor: GLOBAL.SIDEBAR_BG,
                ...(isMobile ? {} : { borderColor: GLOBAL.SIDEBAR_BORDER })
            }}
        >
            {children}
        </nav>
    )
}

export default SidebarContainer
