import { createHashRouter } from 'react-router-dom'
import { Layout } from '../components/common/Layout'
import { SubjectsPage } from '../pages/SubjectsPage'
import { CoursesPage } from '../pages/CoursesPage'
import { TopicsPage } from '../pages/TopicsPage'
import { HomePage } from '../pages/HomePage'
import { LabPage } from '../pages/LabPage'
import { MissionPage } from '../pages/MissionPage'
import { AccessibilityPage } from '../pages/AccessibilityPage'
import { TheoryPage } from '../pages/TheoryPage'
import { GamesHub } from '../features/games/GamesHub'
import { PizzaFractions } from '../features/games/PizzaFractions'
import { FractionMemory } from '../features/games/FractionMemory'
import { FractionRace } from '../features/games/FractionRace'

export const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SubjectsPage />,
            },
            {
                path: 'matematicas',
                element: <CoursesPage />,
            },
            {
                path: 'matematicas/:courseId',
                element: <TopicsPage />,
            },
            // Ruta para Fracciones de 2º ESO (contenido actual)
            {
                path: 'matematicas/2eso/fracciones',
                element: <HomePage />,
            },
            {
                path: 'matematicas/2eso/fracciones/laboratorio',
                element: <LabPage />,
            },
            {
                path: 'matematicas/2eso/fracciones/retos',
                element: <MissionPage />,
            },
            {
                path: 'matematicas/2eso/fracciones/teoria',
                element: <TheoryPage />,
            },
            // Games Hub and individual games
            {
                path: 'matematicas/2eso/fracciones/jokuak',
                element: <GamesHub />,
            },
            {
                path: 'matematicas/2eso/fracciones/jokuak/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematicas/2eso/fracciones/jokuak/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematicas/2eso/fracciones/jokuak/carrera',
                element: <FractionRace />,
            },
            // Rutas legacy para compatibilidad
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

