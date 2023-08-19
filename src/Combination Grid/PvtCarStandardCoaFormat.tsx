import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { pvtCarStandardCOAFormat } from '../Data/Data';
import React, { useEffect, useRef } from 'react';

// register Handsontable's modules  
registerAllModules();

function Home() {
    const hotRef = useRef(null);

    let buttonClickCallback;

    useEffect(() => {
        const hot = hotRef.current?.hotInstance;

        
        if(hot){
            const exportPlugin = hot.getPlugin('exportFile');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        buttonClickCallback = () => {
            exportPlugin.downloadFile('csv', {
                bom: false,
                columnDelimiter: ',',
                columnHeaders: false,
                exportHiddenColumns: true,
                exportHiddenRows: true,
                fileExtension: 'csv',
                filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
                mimeType: 'text/csv',
                rowDelimiter: '\r\n',
                rowHeaders: true
            });
        };
    }
    });
    return (
        <>
            <HotTable
                ref={hotRef}
                data={pvtCarStandardCOAFormat}
                rowHeaders={true}
                colHeaders={['Channel', 'Sub-Channel', 'Branch Location', 'Location Category', 'LOB', '(Product)', 'Business Type', 'Make', 'Model', 'Cubic Capacity', 'Segment', 'VehicleClass', 'Fuel Type', 'Section Text ', 'RTO State', 'RTO', 'With CPA', 'NCB', 'Vehicle Age Cat', 'Lower Discount', 'Upper Discount', 'Business Slab', 'Approval Grid for OD Portion', 'Approval Grid for TP Portion', 'Approval Grid for Per Policy ']}
                height="auto"
                // height={320}
                fixedRowsTop={1}
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
                //className="htCenter"
                contextMenu={true}
                filters={true}
                comments={true}
                columnSorting={true}
                dropdownMenu={['filter_by_condition', 'filter_by_value', 'filter_action_bar']}
                // customBorders={true}
                columns={[
                    {
                        "data": "Channel",
                        "readOnly": true
                    },
                    {
                        "data": "Sub-Channel",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white']

                    },
                    {
                        "data": "Branch Location",
                        "readOnly": true
                        // type: 'numeric',
                    },
                    {
                        "data": "Location Category",
                        "readOnly": true
                    },
                    {
                        "data": "LOB",
                        "readOnly": true
                    },
                    {
                        "data": "(Product)",
                        "readOnly": true
                    },
                    {
                        "data": "Business Type",
                        "readOnly": true
                    },
                    {
                        "data": "Make",
                        "readOnly": true
                    },
                    {
                        "data": "Model",
                        "readOnly": true
                    },
                    {
                        "data": "Cubic Capacity",
                        "readOnly": true
                    },
                    {
                        "data": "Segment",
                        "readOnly": false
                    },
                    {
                        "data": "VehicleClass",
                        "readOnly": true
                    },
                    {
                        "data": "Fuel Type",
                        "readOnly": true
                    },
                    {
                        "data": "Section Text ",
                        "readOnly": true
                    },
                    {
                        "data": "RTO State",
                        "readOnly": true
                    },
                    {
                        "data": "RTO",
                        "readOnly": true
                    },
                    {
                        "data": "With CPA",
                        "readOnly": true
                    },
                    {
                        "data": "NCB",
                        "readOnly": true
                    },
                    {
                        "data": "Vehicle Age Cat",
                        "readOnly": true
                    },
                    {
                        "data": "Lower Discount",
                        "readOnly": true
                    },
                    {
                        "data": "Upper Discount",
                        "readOnly": true
                    },
                    {
                        "data": "Business Slab",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for OD Portion",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for TP Portion",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for Per Policy ",
                        "readOnly": true
                    }
                ]
                }
            />
            <div className="controls">
            <button id="export-file" onClick={(...args) => buttonClickCallback(...args)}>Download</button>
            </div>
        </>
    );
}
export default Home;