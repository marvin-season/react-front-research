import {RouteObject} from "react-router-dom";
import Layout from "../layout";
import React from "react";
import Immer from "../pages/immer/immer.tsx";
import PDFSearch from "../pages/PDFSearch/index.tsx";
import DomBehavior from "../pages/DomBehavior/index.tsx";
import Index from "../pages";

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: 'index',
                index: true,
                element: <Index/>
            },
            {
                path: 'dom-behavior',
                element: <DomBehavior/>
            }, {
                path: 'immer',
                element: <Immer/>
            }, {
                path: 'pdf-search',
                element: <PDFSearch/>
            }
        ]
    }
]