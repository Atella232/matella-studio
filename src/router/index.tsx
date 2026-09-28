import { createHashRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { Layout } from '../components/common/Layout'
import { SubjectsPage } from '../pages/SubjectsPage'
import { CoursesPage } from '../pages/CoursesPage'
import { TopicsPage } from '../pages/TopicsPage'
import { AccessibilityPage } from '../pages/AccessibilityPage'
import { RouteError } from '../components/common/RouteError'

const ZenbakiOsoakDBH2Page = lazy(() => import('../pages/dbh2-zenbaki-osoak').then((module) => ({ default: module.ZenbakiOsoakPage })))
const ZatigarritasunaDBH2Page = lazy(() => import('../pages/dbh2-zatigarritasuna').then((module) => ({ default: module.ZatigarritasunaPage })))
const ZatikiakPrototypePage = lazy(() => import('../pages/dbh2-zatikiak-prototype').then((module) => ({ default: module.ZatikiakPrototypePage })))
const PrivacyPage = lazy(() => import('../pages/LegalPages').then((module) => ({ default: module.PrivacyPage })))
const CreditsPage = lazy(() => import('../pages/LegalPages').then((module) => ({ default: module.CreditsPage })))


const ZenbakiNaturalakDBH1Page = lazy(() => import('../pages/dbh1-zenbaki-naturalak-v2').then((module) => ({ default: module.ZenbakiNaturalakPage })))

const ZatigarritasunaDBH1Page = lazy(() => import('../pages/dbh1-zatigarritasuna-v2').then((module) => ({ default: module.ZatigarritasunaIntroPage })))

const ZatikiakDBH1Page = lazy(() => import('../pages/dbh1-zatikiak-v2').then((module) => ({ default: module.ZatikiakIntroPage })))
const ZenbakiOsoakDBH1Page = lazy(() => import('../pages/dbh1-zenbaki-osoak-v2').then((module) => ({ default: module.ZenbakiOsoakIntroPage })))

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
        errorElement: <RouteError />,
        children: [
            {
                // Keeps the header and footer visible when a page fails or a URL does not exist
                errorElement: <RouteError />,
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
                    // Fracciones de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/zatikiak/*',
                        element: <ZatikiakDBH1Page />,
                    },
                    // Números naturales de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/zenbaki-naturalak/*',
                        element: <ZenbakiNaturalakDBH1Page />,
                    },
                    // Divisibilidad de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/divisibilidad/*',
                        element: <ZatigarritasunaDBH1Page />,
                    },
                    // Números enteros de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/numeros-enteros/*',
                        element: <ZenbakiOsoakDBH1Page />,
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

                    // Fracciones de 2º ESO: la unidad V2 gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh2/zatikiak/*',
                        element: <ZatikiakPrototypePage />,
                    },
                    // Números enteros de 2º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh2/numeros-enteros/*',
                        element: <ZenbakiOsoakDBH2Page />,
                    },
                    {
                        path: 'matematika/dbh2/divisibilidad/*',
                        element: <ZatigarritasunaDBH2Page />,
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
                        element: <Navigate to="/matematika/dbh2/zatikiak" replace />,
                    },
                    // Rutas legacy para compatibilidad
                    {
                        path: 'laboratorio',
                        element: <Navigate to="/matematika/dbh2/zatikiak/laboratorio" replace />,
                    },
                    {
                        path: 'retos',
                        element: <Navigate to="/matematika/dbh2/zatikiak/retos" replace />,
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
                        element: <Navigate to="/matematika/dbh2/zatikiak/teoria" replace />,
                    },
                    {
                        path: '*',
                        loader: () => {
                            throw new Response('Not Found', { status: 404 })
                        },
                    },
                ],
            },
        ],
    },
])
