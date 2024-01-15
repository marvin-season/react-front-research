import React from "react";
import './index.css'
const DomBehavior: React.FC<{}> = props => {
    return (
        <>
            <a href={'#left'}>left</a>
            <div className={'wrapper'}>
                <div className={'element'} id={'left'}>a</div>
                <div className={'element'}>b</div>
                <div className={'element'}>c</div>
                <div className={'element'}>d</div>
                <div className={'element'} id={'right'}>e</div>
            </div>
            <a href={'#right'}>right</a>
        </>
    );
};

export default DomBehavior