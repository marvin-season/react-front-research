// import PDFViewer from "./components/pdf";

import {ExcelPreview} from "./components/excel/ExcelPreview.tsx";
import PDFViewer from "./components/pdf";
import {RouterProvider} from "react-router-dom";
import router from "./router";

function App() {

    return (
        <RouterProvider router={router} />
        // <PDFViewer/>
    )
}

export default App
