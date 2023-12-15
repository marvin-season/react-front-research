import React, {useState} from "react";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';

export const ExcelViewer: React.FC<{}> = props => {
    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([])
    return (
        <>
            <input type="file" onChange={(event) => {
                let fileObj = event.target.files[0];
                //just pass the fileObj as parameter
                ExcelRenderer(fileObj, (err, resp) => {
                    console.log(resp)
                    if (err) {
                        console.log(err);
                    } else {
                        setCols(resp.cols)
                        setRows(resp.rows)
                    }
                });
            }} style={{"padding": "10px"}}/>

            <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading"/>
        </>
    );
};