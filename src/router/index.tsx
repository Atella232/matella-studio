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

const HamartarrakDBH1Page = lazy(() => import('../pages/dbh1-hamartarrak-v2').then((module) => ({ default: module.HamartarrakIntroPage })))
const ProportzionaltasunaDBH1Page = lazy(() => import('../pages/dbh1-proportzionaltasuna-v2').then((module) => ({ default: module.ProportzionaltasunaIntroPage })))
const FigurakDBH1Page = lazy(() => import('../pages/dbh1-figurak-v2').then((module) => ({ default: module.FigurakIntroPage })))
const ZatikiakDBH1Page = lazy(() => import('../pages/dbh1-zatikiak-v2').then((module) => ({ default: module.ZatikiakIntroPage })))
const AljebraDBH1Page = lazy(() => import('../pages/dbh1-aljebra-v2').then((module) => ({ default: module.AljebraIntroPage })))
const GeometriaDBH1Page = lazy(() => import('../pages/dbh1-geometria-v2').then((module) => ({ default: module.GeometriaIntroPage })))
const EstatistikaDBH1Page = lazy(() => import('../pages/dbh1-estatistika-v2').then((module) => ({ default: module.EstatistikaIntroPage })))
const AljebraDBH2Page = lazy(() => import('../pages/dbh2-aljebra-v2').then((module) => ({ default: module.AljebraDBH2Page })))
const EkuazioakDBH2Page = lazy(() => import('../pages/dbh2-ekuazioak-v2').then((module) => ({ default: module.EkuazioakDBH2Page })))
const FuntzioakDBH2Page = lazy(() => import('../pages/dbh2-funtzioak-v2').then((module) => ({ default: module.FuntzioakDBH2Page })))
const ErrealakDBH4ApPage = lazy(() => import('../pages/dbh4-aplikatuak-errealak').then((module) => ({ default: module.ErrealakDBH4ApPage })))
const ArrazionalakDBH3Page = lazy(() => import('../pages/dbh3-arrazionalak').then((module) => ({ default: module.ArrazionalakDBH3Page })))
const ErrealakDBH4AkPage = lazy(() => import('../pages/dbh4-akademikoak-errealak').then((module) => ({ default: module.ErrealakDBH4AkPage })))
const ZenbakiOsoakDBH1Page = lazy(() => import('../pages/dbh1-zenbaki-osoak-v2').then((module) => ({ default: module.ZenbakiOsoakIntroPage })))






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
                    // Álgebra de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/algebra/*',
                        element: <AljebraDBH1Page />,
                    },
                    // Geometría de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/geometria/*',
                        element: <GeometriaDBH1Page />,
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
                    // Números decimales de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/numeros-decimales/*',
                        element: <HamartarrakDBH1Page />,
                    },
                    // Proporcionalidad de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/proporcionalidad/*',
                        element: <ProportzionaltasunaDBH1Page />,
                    },
                    // Figuras planas de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/figuras-planas/*',
                        element: <FigurakDBH1Page />,
                    },
                    // Estadística de 1º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh1/estadistica/*',
                        element: <EstatistikaDBH1Page />,
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
                    // Álgebra de 2º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh2/algebra/*',
                        element: <AljebraDBH2Page />,
                    },
                    // Ecuaciones de 2º ESO: unidad V2, gestiona sus propias secciones por URL
                    {
                        path: 'matematika/dbh2/ekuazioak/*',
                        element: <EkuazioakDBH2Page />,
                    },
                    // Funciones de 2.º ESO: teoría, práctica, laboratorio y juegos V2
                    {
                        path: 'matematika/dbh2/funciones/*',
                        element: <FuntzioakDBH2Page />,
                    },
                    // Números racionales de 3.º ESO: unidad V2
                    {
                        path: 'matematika/dbh3/numeros-racionales/*',
                        element: <ArrazionalakDBH3Page />,
                    },
                    // Números reales de 4.º ESO (matemáticas aplicadas): unidad V2
                    {
                        path: 'matematika/dbh4-aplikatuak/numeros-reales/*',
                        element: <ErrealakDBH4ApPage />,
                    },
                    // Números reales y porcentajes de 4.º ESO (matemáticas académicas): unidad V2
                    {
                        path: 'matematika/dbh4-akademikoak/numeros-reales/*',
                        element: <ErrealakDBH4AkPage />,
                    },
                    {
                        path: 'prototipo/ekuazioak-v2',
                        element: <Navigate to="/matematika/dbh2/ekuazioak" replace />,
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
