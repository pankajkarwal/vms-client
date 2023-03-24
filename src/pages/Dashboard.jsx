import React from 'react'
import dashboardImage from '../assets/images/Dashboard.png'

export default function Dashboard() {
    const imagStyle = {
        "max-width": "100%",
        "height":"auto",
        "padding": 0,
        "margin": 0
    }
    return (
        <div>
            <img alt='' style={imagStyle} src={dashboardImage} />
        </div>
    )
}
