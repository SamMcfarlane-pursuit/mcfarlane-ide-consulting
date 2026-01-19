import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationTracker() {
    const location = useLocation();

    useEffect(() => {
        // Log navigation for debugging (no external tracking)
        console.log('Navigation:', location.pathname);
    }, [location]);

    return null;
}