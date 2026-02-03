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
                path: 'matematika',
                element: <CoursesPage />,
            },
            {
                path: 'matematika/:courseId',
                element: <TopicsPage />,
            },
            // Ruta para Fracciones de 2º ESO (contenido actual)
            {
                path: 'matematika/dbh2/zatikiak',
                element: <HomePage />,
            },
            {
                path: 'matematika/dbh2/zatikiak/laboratorio',
                element: <LabPage />,
            },
            {
                path: 'matematika/dbh2/zatikiak/retos',
                element: <MissionPage />,
            },
            {
                path: 'matematika/dbh2/zatikiak/teoria',
                element: <TheoryPage />,
            },
            // Games Hub and individual games
            {
                path: 'matematika/dbh2/zatikiak/jokuak',
                element: <GamesHub />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/carrera',
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

