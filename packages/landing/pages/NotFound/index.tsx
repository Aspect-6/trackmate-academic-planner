import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/pages/Landing/components/Button'
import { BRAND_NAME } from '@shared/config/brand'

const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="landing min-h-dvh flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-5xl sm:text-8xl font-semibold text-white/80 mb-2 select-none">
                404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white/90 mt-2 mb-3">
                Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-md mb-10">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" onClick={() => navigate('/landing')}>
                    Go Home
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </div>

            <p className="absolute bottom-8 text-sm text-white/30">
                {BRAND_NAME}
            </p>
        </div>
    )
}

export default NotFound
