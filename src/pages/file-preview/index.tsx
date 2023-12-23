import {Tabs, TabsProps} from "antd";
import {PDFViewPage} from "./PDFViewPage.tsx";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: <PDFViewPage/>
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
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