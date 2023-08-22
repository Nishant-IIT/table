//this file takes data from a api call

import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function PvtCarStandardCOA() {
    const hotRef = useRef(null);
    const [tableData, setTableData] = useState([]); // State to hold fetched data

    const columnHeaders = Object.keys(tableData[0] || {});

    let saveClickCallback;

    useEffect(() => {
        const hot = hotRef.current?.hotInstance;
        
        
        // Fetch data from the API
        fetch('YOUR_API_ENDPOINT_HERE')
            .then(response => response.json())
            .then(data => {
                setTableData(data); // Update the table data with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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
            });
        };
    }, []);

    return (
        <>
            <HotTable
                ref={hotRef}
                data={tableData} // Use fetched data
                rowHeaders={true}
                colHeaders={columnHeaders}
                contextMenu={true}
                filters={true}
                columnSorting={true}
                licenseKey="non-commercial-and-evaluation"
            />
                
            <div className="controls">
                <button id="save" className="button button--primary button--blue" onClick={saveClickCallback}>Save data</button>
            </div>
        </>
    );
}

export default PvtCarStandardCOA;
