/**
 * Route configuration.
 */
export interface RouteConfig {
    path: string
    fullPath: string
    title: string
}

/**
 * Base path for all webpage routes.
 */
export const BASE_PATH = '/academic'

const route = (name: string, title: string): RouteConfig => {
    return {
        path: name,
        fullPath: `${BASE_PATH}/${name}`,
        title,
    }
}

/**
 * All route configurations keyed by route ID.
 */
export const ROUTES = {
    'dashboard': route('dashboard', 'Dashboard'),
    'calendar': route('calendar', 'Calendar'),
    'my-assignments': route('my-assignments', 'My Assignments'),
    'my-classes': route('my-classes', 'My Classes'),
    'my-schedule': route('my-schedule', 'My Schedule'),
    'settings': route('settings', 'Settings'),
}

/**
 * Quick access to full paths for use in links and navigation.
 */
export const PATHS = {
    DASHBOARD: ROUTES['dashboard'].fullPath,
    CALENDAR: ROUTES['calendar'].fullPath,
    ASSIGNMENTS: ROUTES['my-assignments'].fullPath,
    CLASSES: ROUTES['my-classes'].fullPath,
    SCHEDULES: ROUTES['my-schedule'].fullPath,
    SETTINGS: ROUTES['settings'].fullPath,
}

/**
 * Default route to redirect to from root.
 */
export const DEFAULT_ROUTE = ROUTES['dashboard']

/**
 * Get route config by pathname (with leading slash).
 */
export function getRouteByPath(pathname: string): RouteConfig | undefined {
    if (pathname === '/') return DEFAULT_ROUTE
    return Object.values(ROUTES).find(r => r.fullPath === pathname)
}
