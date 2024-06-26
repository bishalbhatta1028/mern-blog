import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'

function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                {/* SideBar */}
                <DashSideBar />
            </div>
            {/* Profile */}
            {tab === 'profile' && <DashProfile />}
        </div>
    )
}

export default Dashboard