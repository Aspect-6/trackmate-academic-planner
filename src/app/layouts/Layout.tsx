import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Plus, Menu } from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';
import MobileSidebar from '@/app/components/MobileSidebar';
import { useApp } from '@/app/context/AppContext';
import { cn } from '@/app/lib/utils';
import { GLOBAL, MY_CLASSES } from '@/app/styles/colors';

const Layout: React.FC = () => {
    const location = useLocation();
    const { openModal } = useApp();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const isCalendar = location.pathname === '/calendar';

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard' || path === '/') return 'Dashboard';
        if (path === '/calendar') return 'Calendar';
        if (path === '/assignments') return 'My Assignments';
        if (path === '/classes') return 'My Classes';
        if (path === '/schedule') return 'My Schedule';
        if (path === '/settings') return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className={cn(
            "app-container flex bg-[#0d1117] text-[#c9d1d9]",
            isCalendar ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"
        )}>
            <Sidebar />
            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            <main className={cn(
                "content-area flex-grow p-6 lg:p-8 flex flex-col",
                isCalendar && "h-full overflow-hidden"
            )}>
                <header className="mb-8 border-b border-gray-700 pb-4 flex justify-between items-center gap-3 flex-shrink-0">
                    <div className="flex items-center min-w-0 gap-3">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
                        >
                            <Menu className="w-8 h-8" />
                        </button>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold truncate" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>{getPageTitle()}</h1>
                    </div>
                    <button
                        onClick={() => {
                            if (location.pathname === '/classes') return openModal('add-class');
                            if (location.pathname === '/assignments') return openModal('add-assignment');
                            if (location.pathname === '/calendar') return openModal('add-event');
                            return openModal('type-selector');
                        }}
                        className="flex items-center py-2 px-3 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white transition duration-150 ease-in-out whitespace-nowrap flex-shrink-0"
                        style={{ backgroundColor: location.pathname === '/classes' ? MY_CLASSES.CLASS_MODAL_BUTTON_BG : location.pathname === '/assignments' ? GLOBAL.ASSIGNMENT_BUTTON_BG : location.pathname === '/calendar' ? GLOBAL.EVENT_BUTTON_BG : GLOBAL.ADDITEM_BUTTON_BG }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = location.pathname === '/classes' ? MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER : location.pathname === '/assignments' ? GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER : location.pathname === '/calendar' ? GLOBAL.EVENT_BUTTON_BG_HOVER : GLOBAL.ADDITEM_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = location.pathname === '/classes' ? MY_CLASSES.CLASS_MODAL_BUTTON_BG : location.pathname === '/assignments' ? GLOBAL.ASSIGNMENT_BUTTON_BG : location.pathname === '/calendar' ? GLOBAL.EVENT_BUTTON_BG : GLOBAL.ADDITEM_BUTTON_BG}
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        <span className="hidden sm:inline">{location.pathname === '/classes' ? 'Add Class' :
                            location.pathname === '/assignments' ? 'Add Assignment' :
                                location.pathname === '/calendar' ? 'Add Event' : 'Add Item'}</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </header>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
