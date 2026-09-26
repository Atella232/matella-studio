import { createHashRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '../components/common/Layout'
import { SubjectsPage } from '../pages/SubjectsPage'
import { CoursesPage } from '../pages/CoursesPage'
import { TopicsPage } from '../pages/TopicsPage'
import { AccessibilityPage } from '../pages/AccessibilityPage'

const ZatikiakPrototypePage = lazy(() => import('../pages/dbh2-zatikiak-prototype').then((module) => ({ default: module.ZatikiakPrototypePage })))
const HomePage = lazy(() => import('../pages/HomePage').then((module) => ({ default: module.HomePage })))
const LabPage = lazy(() => import('../pages/LabPage').then((module) => ({ default: module.LabPage })))
const MissionPage = lazy(() => import('../pages/MissionPage').then((module) => ({ default: module.MissionPage })))
const TheoryPage = lazy(() => import('../pages/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const ExercisesPageDBH2_Zatikiak = lazy(() => import('../pages/dbh2-zatikiak/ExercisesPage').then((module) => ({ default: module.ExercisesPage })))
const GamesHub = lazy(() => import('../features/games/GamesHub').then((module) => ({ default: module.GamesHub })))
const PizzaFractions = lazy(() => import('../features/games/PizzaFractions').then((module) => ({ default: module.PizzaFractions })))
const FractionMemory = lazy(() => import('../features/games/FractionMemory').then((module) => ({ default: module.FractionMemory })))
const FractionRace = lazy(() => import('../features/games/FractionRace').then((module) => ({ default: module.FractionRace })))
const PrivacyPage = lazy(() => import('../pages/LegalPages').then((module) => ({ default: module.PrivacyPage })))
const CreditsPage = lazy(() => import('../pages/LegalPages').then((module) => ({ default: module.CreditsPage })))

const HomePageDBH1 = lazy(() => import('../pages/dbh1-zatikiak/HomePage').then((module) => ({ default: module.HomePage })))
const LabPageDBH1 = lazy(() => import('../pages/dbh1-zatikiak/LabPage').then((module) => ({ default: module.LabPage })))
const MissionPageDBH1 = lazy(() => import('../pages/dbh1-zatikiak/MissionPage').then((module) => ({ default: module.MissionPage })))
const TheoryPageDBH1 = lazy(() => import('../pages/dbh1-zatikiak/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const GamesHubDBH1 = lazy(() => import('../features/games/GamesHubDBH1').then((module) => ({ default: module.GamesHub })))

const HomePageDBH1_Zenbaki = lazy(() => import('../pages/dbh1-zenbaki-naturalak/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_Zenbaki = lazy(() => import('../pages/dbh1-zenbaki-naturalak/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_Zenbaki = lazy(() => import('../pages/dbh1-zenbaki-naturalak/LabPage').then((module) => ({ default: module.LabPage })))
const MissionPageDBH1_Zenbaki = lazy(() => import('../pages/dbh1-zenbaki-naturalak/MissionPage').then((module) => ({ default: module.MissionPage })))
const GamesPageDBH1_Zenbaki = lazy(() => import('../pages/dbh1-zenbaki-naturalak/GamesPage').then((module) => ({ default: module.GamesPage })))

const HomePageDBH1_Zatigarritasuna = lazy(() => import('../pages/dbh1-zatigarritasuna/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_Zatigarritasuna = lazy(() => import('../pages/dbh1-zatigarritasuna/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_Zatigarritasuna = lazy(() => import('../pages/dbh1-zatigarritasuna/LabPage').then((module) => ({ default: module.LabPageDBH1_Zatigarritasuna })))

const HomePageDBH1_ZenbakiOsoak = lazy(() => import('../pages/dbh1-zenbaki-osoak/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_ZenbakiOsoak = lazy(() => import('../pages/dbh1-zenbaki-osoak/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_ZenbakiOsoak = lazy(() => import('../pages/dbh1-zenbaki-osoak/LabPage').then((module) => ({ default: module.LabPageDBH1_ZenbakiOsoak })))

const HomePageDBH1_Algebra = lazy(() => import('../pages/dbh1-algebra/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_Algebra = lazy(() => import('../pages/dbh1-algebra/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_Algebra = lazy(() => import('../pages/dbh1-algebra/LabPage').then((module) => ({ default: module.LabPage })))

const HomePageDBH1_Geometria = lazy(() => import('../pages/dbh1-geometria/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_Geometria = lazy(() => import('../pages/dbh1-geometria/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_Geometria = lazy(() => import('../pages/dbh1-geometria/LabPage').then((module) => ({ default: module.LabPage })))

const HomePageDBH1_Estadistica = lazy(() => import('../pages/dbh1-taulak-grafikoak/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH1_Estadistica = lazy(() => import('../pages/dbh1-taulak-grafikoak/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH1_Estadistica = lazy(() => import('../pages/dbh1-taulak-grafikoak/LabPage').then((module) => ({ default: module.LabPage })))

const HomePageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/LabPage').then((module) => ({ default: module.LabPage })))
const MissionPageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/MissionPage').then((module) => ({ default: module.MissionPage })))
const GamesPageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/GamesPage').then((module) => ({ default: module.GamesPage })))
const ExercisesPageDBH2_Algebra = lazy(() => import('../pages/dbh2-algebra/ExercisesPage').then((module) => ({ default: module.ExercisesPage })))

const HomePageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/HomePage').then((module) => ({ default: module.HomePage })))
const TheoryPageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/TheoryPage').then((module) => ({ default: module.TheoryPage })))
const LabPageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/LabPage').then((module) => ({ default: module.LabPage })))
const MissionPageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/MissionPage').then((module) => ({ default: module.MissionPage })))
const GamesPageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/GamesPage').then((module) => ({ default: module.GamesPage })))
const ExercisesPageDBH2_Ekuazioak = lazy(() => import('../pages/dbh2-ekuazioak/ExercisesPage').then((module) => ({ default: module.ExercisesPage })))
const EkuazioakPrototypePage = lazy(() => import('../pages/dbh2-ekuazioak-prototype').then((module) => ({ default: module.EkuazioakPrototypePage })))

const NaturaCoursesPage = lazy(() => import('../pages/NaturaCoursesPage').then((module) => ({ default: module.NaturaCoursesPage })))
const NaturaTopicsPage = lazy(() => import('../pages/NaturaTopicsPage').then((module) => ({ default: module.NaturaTopicsPage })))
const NaturaBiosferaPage = lazy(() => import('../pages/natura-biosfera').then((module) => ({ default: module.NaturaBiosferaPage })))

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
                path: 'natura',
                element: <NaturaCoursesPage />,
            },
            {
                path: 'matematika/:courseId',
                element: <TopicsPage />,
            },
            {
                path: 'natura/:courseId',
                element: <NaturaTopicsPage />,
            },
            {
                path: 'natura/dbh1/biosfera',
                element: <NaturaBiosferaPage />,
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
                path: 'matematika/dbh1/zenbaki-naturalak/laboratorio',
                element: <LabPageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/retos',
                element: <MissionPageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/misioa',
                element: <MissionPageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/juegos',
                element: <GamesPageDBH1_Zenbaki />,
            },
            {
                path: 'matematika/dbh1/zenbaki-naturalak/jokuak',
                element: <GamesPageDBH1_Zenbaki />,
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
                path: 'matematika/dbh1/algebra/laboratorio',
                element: <LabPageDBH1_Algebra />,
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
                path: 'matematika/dbh1/geometria/laboratorio',
                element: <LabPageDBH1_Geometria />,
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
                path: 'matematika/dbh1/estadistica/laboratorio',
                element: <LabPageDBH1_Estadistica />,
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
                path: 'matematika/dbh1/zatikiak/misioa',
                element: <MissionPageDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/teoria',
                element: <TheoryPageDBH1 />,
            },
            // Games Hub for 1º ESO (Individual games are shared)
            {
                path: 'matematika/dbh1/zatikiak/juegos',
                element: <GamesHubDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak',
                element: <GamesHubDBH1 />,
            },
            {
                path: 'matematika/dbh1/zatikiak/juegos/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh1/zatikiak/juegos/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh1/zatikiak/jokuak/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh1/zatikiak/juegos/carrera',
                element: <FractionRace />,
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
                path: 'matematika/dbh2/zatikiak/misioa',
                element: <MissionPage />,
            },
            {
                path: 'matematika/dbh2/zatikiak/teoria',
                element: <TheoryPage />,
            },
            {
                path: 'matematika/dbh2/zatikiak/ejercicios',
                element: <ExercisesPageDBH2_Zatikiak />,
            },
            {
                path: 'matematika/dbh2/zatikiak/ariketak',
                element: <ExercisesPageDBH2_Zatikiak />,
            },
            // Games Hub and individual games
            {
                path: 'matematika/dbh2/zatikiak/juegos',
                element: <GamesHub />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak',
                element: <GamesHub />,
            },
            {
                path: 'matematika/dbh2/zatikiak/juegos/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/pizza',
                element: <PizzaFractions />,
            },
            {
                path: 'matematika/dbh2/zatikiak/juegos/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/memory',
                element: <FractionMemory />,
            },
            {
                path: 'matematika/dbh2/zatikiak/juegos/carrera',
                element: <FractionRace />,
            },
            {
                path: 'matematika/dbh2/zatikiak/jokuak/carrera',
                element: <FractionRace />,
            },
            {
                path: 'matematika/dbh2/algebra',
                element: <HomePageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/teoria',
                element: <TheoryPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/laboratorio',
                element: <LabPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/laborategia',
                element: <LabPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/retos',
                element: <MissionPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/misioa',
                element: <MissionPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/ejercicios',
                element: <ExercisesPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/ariketak',
                element: <ExercisesPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/juegos',
                element: <GamesPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/algebra/jokuak',
                element: <GamesPageDBH2_Algebra />,
            },
            {
                path: 'matematika/dbh2/ekuazioak',
                element: <HomePageDBH2_Ekuazioak />,
            },
            {
                path: 'matematika/dbh2/ekuazioak/teoria',
                element: <TheoryPageDBH2_Ekuazioak />,
            },
            {
                path: 'matematika/dbh2/ekuazioak/laboratorio',
                element: <LabPageDBH2_Ekuazioak />,
            },
            {
                path: 'matematika/dbh2/ekuazioak/retos',
                element: <MissionPageDBH2_Ekuazioak />,
            },
            {
                path: 'matematika/dbh2/ekuazioak/ejercicios',
                element: <ExercisesPageDBH2_Ekuazioak />,
            },
            {
                path: 'matematika/dbh2/ekuazioak/juegos',
                element: <GamesPageDBH2_Ekuazioak />,
            },
            {
                path: 'prototipo/ekuazioak-v2',
                element: <EkuazioakPrototypePage />,
            },
            {
                path: 'prototipo/zatikiak-v2',
                element: <Suspense fallback={<div role="status" aria-live="polite">Zatikiak V2…</div>}><ZatikiakPrototypePage /></Suspense>,
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
                path: 'privacidad',
                element: <PrivacyPage />,
            },
            {
                path: 'creditos',
                element: <CreditsPage />,
            },
            {
                path: 'teoria',
                element: <TheoryPage />,
            },
        ],
    },
])
