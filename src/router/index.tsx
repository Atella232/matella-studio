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

// DBH 1 Components
import { HomePage as HomePageDBH1 } from '../pages/dbh1-zatikiak/HomePage'
import { LabPage as LabPageDBH1 } from '../pages/dbh1-zatikiak/LabPage'
import { MissionPage as MissionPageDBH1 } from '../pages/dbh1-zatikiak/MissionPage'
import { TheoryPage as TheoryPageDBH1 } from '../pages/dbh1-zatikiak/TheoryPage'
import { GamesHub as GamesHubDBH1 } from '../features/games/GamesHubDBH1'

import { HomePage as HomePageDBH1_Zenbaki } from '../pages/dbh1-zenbaki-naturalak/HomePage'
import { TheoryPage as TheoryPageDBH1_Zenbaki } from '../pages/dbh1-zenbaki-naturalak/TheoryPage'
import { MissionPage as MissionPageDBH1_Zenbaki } from '../pages/dbh1-zenbaki-naturalak/MissionPage'

import { HomePage as HomePageDBH1_Zatigarritasuna } from '../pages/dbh1-zatigarritasuna/HomePage'
import { TheoryPage as TheoryPageDBH1_Zatigarritasuna } from '../pages/dbh1-zatigarritasuna/TheoryPage'
import { LabPageDBH1_Zatigarritasuna } from '../pages/dbh1-zatigarritasuna/LabPage'

import { HomePage as HomePageDBH1_ZenbakiOsoak } from '../pages/dbh1-zenbaki-osoak/HomePage'
import { TheoryPage as TheoryPageDBH1_ZenbakiOsoak } from '../pages/dbh1-zenbaki-osoak/TheoryPage'
import { LabPageDBH1_ZenbakiOsoak } from '../pages/dbh1-zenbaki-osoak/LabPage'

import { HomePage as HomePageDBH1_Algebra } from '../pages/dbh1-algebra/HomePage'
import { TheoryPage as TheoryPageDBH1_Algebra } from '../pages/dbh1-algebra/TheoryPage'
import { LabPage as LabPageDBH1_Algebra } from '../pages/dbh1-algebra/LabPage'

import { HomePage as HomePageDBH1_Geometria } from '../pages/dbh1-geometria/HomePage'
import { TheoryPage as TheoryPageDBH1_Geometria } from '../pages/dbh1-geometria/TheoryPage'
import { LabPage as LabPageDBH1_Geometria } from '../pages/dbh1-geometria/LabPage'

import { HomePage as HomePageDBH1_Estadistica } from '../pages/dbh1-taulak-grafikoak/HomePage'
import { TheoryPage as TheoryPageDBH1_Estadistica } from '../pages/dbh1-taulak-grafikoak/TheoryPage'
import { LabPage as LabPageDBH1_Estadistica } from '../pages/dbh1-taulak-grafikoak/LabPage'

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
            // Ruta para Fracciones de 1º ESO
            {
                path: 'matematika/dbh1/zatikiak',
                element: <HomePageDBH1 />,
            },
            // Ruta para Números Naturales de 1º ESO
            {
                path: 'matematika/dbh1/zenbaki-naturalak',
                element: <HomePageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/teoria',
                element: <TheoryPageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/misioa',
                element: <MissionPageDBH1_Zenbaki />,
            },
            // Ruta para Divisibilidad de 1º ESO
            {
                path: 'matematika/dbh1/divisibilidad',
                element: <HomePageDBH1_Zatigarritasuna />,
            },
            {
                path: 'matematika/dbh1/divisibilidad/teoria',
                element: <TheoryPageDBH1_Zatigarritasuna />,
            },
            {
                path: 'matematika/dbh1/divisibilidad/laboratorio',
                element: <LabPageDBH1_Zatigarritasuna />,
            },
            // Ruta para Números Enteros de 1º ESO
            {
                path: 'matematika/dbh1/numeros-enteros',
                element: <HomePageDBH1_ZenbakiOsoak />,
            },
            {
                path: 'matematika/dbh1/numeros-enteros/teoria',
                element: <TheoryPageDBH1_ZenbakiOsoak />,
            },
            {
                path: 'matematika/dbh1/numeros-enteros/laboratorio',
                element: <LabPageDBH1_ZenbakiOsoak />,
            },
            // Ruta para Álgebra de 1º ESO
            {
                path: 'matematika/dbh1/algebra',
                element: <HomePageDBH1_Algebra />,
            },
            {
                path: 'matematika/dbh1/algebra/teoria',
                element: <TheoryPageDBH1_Algebra />,
            },
            {
                path: 'matematika/dbh1/algebra/laborategia',
                element: <LabPageDBH1_Algebra />,
            },
            // Ruta para Geometría de 1º ESO
            {
                path: 'matematika/dbh1/geometria',
                element: <HomePageDBH1_Geometria />,
            },
            {
                path: 'matematika/dbh1/geometria/teoria',
                element: <TheoryPageDBH1_Geometria />,
            },
            {
                path: 'matematika/dbh1/geometria/laborategia',
                element: <LabPageDBH1_Geometria />,
            },
            // Ruta para Estadística de 1º ESO
            {
                path: 'matematika/dbh1/estadistica',
                element: <HomePageDBH1_Estadistica />,
            },
            {
                path: 'matematika/dbh1/estadistica/teoria',
                element: <TheoryPageDBH1_Estadistica />,
            },
            {
                path: 'matematika/dbh1/estadistica/laborategia',
                element: <LabPageDBH1_Estadistica />,
            },
            {
                path: 'matematika/dbh1/zatikiak/laboratorio',
                element: <LabPageDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/retos',
                element: <MissionPageDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/teoria',
                element: <TheoryPageDBH1 />,
            },
            // Games Hub for 1º ESO (Individual games are shared)
            {
                path: 'matematika/dbh1/zatikiak/jokuak',
                element: <GamesHubDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak/carrera',
                element: <FractionRace />,
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

