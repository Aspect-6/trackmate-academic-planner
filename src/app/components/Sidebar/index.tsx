import React from 'react'
import { cn } from '@/app/lib/utils'

import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'
import SidebarDivider from './SidebarDivider'
import SidebarContainer from './SidebarContainer'

interface SidebarProps {
    variant: 'desktop' | 'mobile'
    isOpen?: boolean
    onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ variant, isOpen, onClose }) => {
    const isMobile = variant === 'mobile'

    if (isMobile && !isOpen) return null

    return (
        <SidebarContainer isMobile={isMobile}>
            <SidebarHeader isMobile={isMobile} onClose={onClose} />

            <SidebarDivider isMobile={isMobile} />

            <div className={cn("flex-grow min-h-0", isMobile ? "py-4 overflow-y-auto" : "flex flex-col")}>
                <SidebarNav onLinkClick={isMobile ? onClose : undefined} />
            </div>
        </SidebarContainer>
    )
}

export default Sidebar
