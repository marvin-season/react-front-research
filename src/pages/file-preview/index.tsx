import {Tabs, TabsProps} from "antd";
// import {PDFViewPage} from "./PDFViewPage.tsx";
import {PDFViewPage2} from "./PDFViewPage2.tsx";
import PDFHL from "./PDFHL.tsx";
const fileUrl = 'demo2.pdf'
const workerUrl = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js";
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'PDF HL',
        children: <PDFHL workerUrl={workerUrl} fileUrl={fileUrl}/>,
    },
    {
        key: '2',
        label: 'PDFViewPage 2',
        children: <PDFViewPage2/>,
    },
    {
        key: '3',
        label: 'Tab 1',
        // children: <PDFViewPage/>
    },

    {
        key: '4',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

const FilePreview = () => {
    return <>
        <Tabs defaultActiveKey="1" items={items}/>
    </>
}

export default FilePreview