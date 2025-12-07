import {createBrowserRouter, Navigate} from "react-router-dom";
import {type JSX, lazy, Suspense} from "react";
import MainLoader from "../components/MainLoader";

const LandingPage = lazy(() =>
    import("../components/LandingPage").then(m => ({default: m.LandingPage}))
);
const FeaturesPage = lazy(() =>
    import("../components/FeaturesPage").then(m => ({default: m.FeaturesPage}))
);
const HowItWorksPage = lazy(() =>
    import("../components/HowItWorksPage").then(m => ({default: m.HowItWorksPage}))
);
const PricingPage = lazy(() =>
    import("../components/PricingPage").then(m => ({default: m.PricingPage}))
);
const ContactPage = lazy(() =>
    import("../components/ContactPage").then(m => ({default: m.ContactPage}))
);
const AboutPage = lazy(() =>
    import("../components/AboutPage").then(m => ({default: m.AboutPage}))
);
const Login = lazy(() =>
    import("../components/Login").then(m => ({default: m.Login}))
);
const Signup = lazy(() =>
    import("../components/Signup").then(m => ({default: m.Signup}))
);

const DashboardLayout = lazy(() =>
    import("../components/DashboardLayout").then(m => ({default: m.DashboardLayout}))
);
const DashboardHome = lazy(() =>
    import("../components/DashboardHome").then(m => ({default: m.DashboardHome}))
);
const ExploreDistrict = lazy(() =>
    import("../components/ExploreDistrict").then(m => ({default: m.ExploreDistrict}))
);
const StateFNO = lazy(() =>
    import("../components/StateFNO").then(m => ({default: m.StateFNO}))
);
const MutualFunds = lazy(() =>
    import("../components/MutualFunds").then(m => ({default: m.MutualFunds}))
);
const Portfolio = lazy(() =>
    import("../components/Portfolio").then(m => ({default: m.Portfolio}))
);
const Insights = lazy(() =>
    import("../components/Insights").then(m => ({default: m.Insights}))
);
const SmartReceipt = lazy(() =>
    import("../components/SmartReceipt").then(m => ({default: m.SmartReceipt}))
);
const Notifications = lazy(() =>
    import("../components/Notifications").then(m => ({default: m.Notifications}))
);
const Watchlist = lazy(() =>
    import("../components/Watchlist").then(m => ({default: m.Watchlist}))
);
const Settings = lazy(() =>
    import("../components/Settings").then(m => ({default: m.Settings}))
);

const Load = (element: JSX.Element) => (
    <Suspense fallback={<MainLoader/>}>
        {element}
    </Suspense>
);

// Logout handler (simple safe redirect)
function onLogout() {
    window.location.replace("/"); // cleaner for logout
}

const router = createBrowserRouter([
    // PUBLIC ROUTES
    {path: "/", element: Load(<LandingPage/>)},
    {path: "/features", element: Load(<FeaturesPage/>)},
    {path: "/how-it-works", element: Load(<HowItWorksPage/>)},
    {path: "/pricing", element: Load(<PricingPage/>)},
    {path: "/contact", element: Load(<ContactPage/>)},
    {path: "/about", element: Load(<AboutPage/>)},

    {path: "/login", element: Load(<Login/>)},
    {path: "/signup", element: Load(<Signup/>)},

    // DASHBOARD ROUTES
    {
        path: "/dashboard",
        element: Load(<DashboardLayout onLogout={onLogout}/>),
        children: [
            {index: true, element: Load(<DashboardHome/>)},

            {path: "explore", element: Load(<ExploreDistrict/>)},
            {path: "state-fno", element: Load(<StateFNO/>)},

            {
                path: "mutual-funds",
                element: Load(<MutualFunds onLogout={onLogout}/>)
            },

            {path: "portfolio", element: Load(<Portfolio/>)},
            {path: "insights", element: Load(<Insights/>)},
            {path: "receipts", element: Load(<SmartReceipt/>)},
            {path: "notifications", element: Load(<Notifications/>)},
            {path: "watchlist", element: Load(<Watchlist/>)},

            {
                path: "wallet",
                element: Load(<Settings initialCategory="payments"/>)
            },

            {path: "settings", element: Load(<Settings/>)},
        ],
    },

    // CATCH-ALL UNUSED ROUTES
    {path: "*", element: <Navigate to="/"/>},
]);

export default router;
