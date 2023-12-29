import React from "react";
import {Tabs, TabsProps} from "antd";
import UseImmer from "./UseImmer.tsx";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: <UseImmer/>
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
const Immer: React.FC<{}> = props => {
    return (
        <>
            <Tabs defaultActiveKey="1" items={items}/>
        </>
    );
};

export default Immer