import { createHashRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'
import { LabPage } from '../pages/LabPage'
import { MissionPage } from '../pages/MissionPage'
import { AccessibilityPage } from '../pages/AccessibilityPage'
import { TheoryPage } from '../pages/TheoryPage'

export const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'laboratorio',
                element: <LabPage />,
            },
            {
                path: 'retos',
                element: <MissionPage />,
            },
            {
                path: 'accesibilidad',
                element: <AccessibilityPage />,
            },
            {
                path: 'teoria',
                element: <TheoryPage />,
            },
        ],
    },
])

