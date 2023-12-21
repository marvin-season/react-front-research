import React from "react";
import * as XLSX from 'xlsx';

export const ExcelPreview: React.FC<{}> = props => {
    return (
        <>
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const bstr = event.target.result;
                        const wb = XLSX.read(bstr, {type: 'binary'});
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        const data = XLSX.utils.sheet_to_json(ws, {header: 1});
                        console.log('data', data)
                    };
                    reader.readAsBinaryString(file);
                }}
                style={{padding: '10px'}}
            />
        </>
    );
};