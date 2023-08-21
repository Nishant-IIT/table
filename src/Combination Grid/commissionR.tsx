//this file takes data from a variable

import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { pvtCarStandardCOAFormat } from '../Data/Data';
import React, { useEffect, useRef } from 'react';

// register Handsontable's modules  
registerAllModules();

function PvtCarStandardCOA() {
    const hotRef = useRef(null);

    const columnHeaders = Object.keys(pvtCarStandardCOAFormat[0]);

    let saveClickCallback;

    useEffect(() => {
        const hot = hotRef.current?.hotInstance;

        hot.updateSettings({
            cells(row, col, prop) {
                const cellProperties = {};

                if (prop === 'Model') {
                    cellProperties.editor = 'text';

                } else {
                    cellProperties.editor = false;
                }

                return cellProperties;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveClickCallback = () => {
            // save all cell's data
            fetch('https://handsontable.com/docs/scripts/json/save.json', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: hot.getData() })
            })
        };
    });
    return (
        <>

            <HotTable
                ref={hotRef}
                data={pvtCarStandardCOAFormat} //get data from json file
                rowHeaders={true}
                colHeaders={columnHeaders} //headers of the table
                contextMenu={true}
                filters={true}
                columnSorting={true}
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            />

            <div className="controls">
                <button id="save" className="button button--primary button--blue" onClick={(...args) => saveClickCallback(...args)}>Save data</button>
            </div>
        </>
    );
}
export default PvtCarStandardCOA;