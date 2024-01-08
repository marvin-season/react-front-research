import {RouteObject} from "react-router-dom";
import Layout from "../layout";
import React, {Suspense} from "react";
import FilePreview from "../pages/file-preview";
import Immer from "../pages/immer/immer.tsx";
import PDFSearch from "../pages/PDFSearch/index.tsx";
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
                path: 'immer',
                element: <Immer/>
            }, {
                path: 'pdf-search',
                element: <PDFSearch/>
            },
            {
                path: 'file-preview',
                element: <Suspense fallback={<div>111</div>}>
                    <FilePreview/>
                </Suspense>
            }
        ]
    }
]