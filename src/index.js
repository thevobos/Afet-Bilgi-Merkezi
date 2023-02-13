import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import HelpCenter from "./layouts/HelpCenter";
import "./assets/App.css"
import Dashboard from "./routers/Dashboard";
import Support from "./routers/Support";
import {ConfigProvider} from "antd";
import LastEarthquakes from "./routers/LastEarthquakes";
import EvacuationAssemblyAreas from "./routers/EvacuationAssemblyAreas";
import HelpScatterPoints from "./routers/HelpScatterPoints";



const router = createBrowserRouter([
    {
        path: "/",
        element: <HelpCenter/>,
        errorElement: <HelpCenter/>,
        children: [
            {
                path: "/",
                index:true,
                element: <Dashboard/>,
            },
            {
                path: "/tahliye-toplanma-alanlari",
                index:true,
                element: <EvacuationAssemblyAreas/>,
            },
            {
                path: "/yardim-dagitim-noktalari",
                index:true,
                element: <HelpScatterPoints/>,
            },
            {
                path: "/son-depremler",
                index:true,
                element: <LastEarthquakes/>,
            },
            {
                path: "yardim/:link",
                element: <Support/>,
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {

                    colorPrimary: '#56c145'
                }
            }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
);

reportWebVitals();