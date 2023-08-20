import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { twStandardCOAFormat } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function TwStandardCOA() {
    const hotRef = useRef(null);
    const [output, setOutput] = useState('Data will load from server');
    const [isAutosave, setIsAutosave] = useState(false);

    let buttonClickCallback;
    let saveClickCallback;

    const autosaveClickCallback = (event) => {
        setIsAutosave(event.target.checked);
        if (event.target.checked) {
            setOutput('Changes will be autosaved');
        } else {
            setOutput('Changes will not be autosaved');
        }
    };

    useEffect(() => {
        const hot = hotRef.current.hotInstance;
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
                .then(response => {
                    setOutput('Data saved');
                    console.log('The POST request is only used here for the demo purposes');
                });
        };
    });
    return (
        <>
        
            <HotTable
                ref={hotRef}
                data={twStandardCOAFormat}
                rowHeaders={true}
                colHeaders={['Approval Sr No', 'Channel', 'Sub-Channel', 'Branch Location', 'Location Category', 'LOB', '(Product)', 'Business Type', 'Make', 'Model', 'Cubic Capacity', 'Segment', 'VehicleClass', 'Fuel Type', 'Section Text ', 'RTO State', 'RTO', 'With CPA', 'NCB', 'Vehicle Age Cat', 'Ensure Grid Applicability', 'Lower Discount', 'Upper Discount', 'Business Slab', 'Retentions %', 'Approval Grid for OD Portion', 'Approval Grid for TP Portion', 'Approval Grid for Per Policy ', 'Created By', 'Created By Code', 'Approved By', 'Approved By Code', 'Rejected By', 'Rejected By Code', 'Created On', 'Rejected On', 'Approved On', 'Modified On', 'Status']}
                height="auto"
                fixedRowsTop={1}
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
                contextMenu={true}
                filters={true}
                comments={true}
                columnSorting={true}
                dropdownMenu={['filter_by_condition', 'filter_by_value', 'filter_action_bar']}
                customBorders={true}

                columns={[
                    {
                        "data": "Approval Sr No",
                        "readOnly": true
                    },
                    {
                        "data": "Channel",
                        "readOnly": true
                    },
                    {
                        "data": "Sub-Channel",
                        "readOnly": true
                    },
                    {
                        "data": "Branch Location",
                        "readOnly": true
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
                        "readOnly": true
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
                        "data": "Ensure Grid Applicability",
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
                        "data": "Retentions %",
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
                    },
                    {
                        "data": "Created By",
                        "readOnly": true
                    },
                    {
                        "data": "Created By Code",
                        "readOnly": true
                    },
                    {
                        "data": "Approved By",
                        "readOnly": true
                    },
                    {
                        "data": "Approved By Code",
                        "readOnly": true
                    },
                    {
                        "data": "Rejected By",
                        "readOnly": true
                    },
                    {
                        "data": "Rejected By Code",
                        "readOnly": true
                    },
                    {
                        "data": "Created On",
                        "readOnly": true
                    },
                    {
                        "data": "Rejected On",
                        "readOnly": true
                    },
                    {
                        "data": "Approved On",
                        "readOnly": true
                    },
                    {
                        "data": "Modified On",
                        "readOnly": true
                    },
                    {
                        "data": "Status",
                        "readOnly": true
                    }
                ]
                }
            />
            <div className="controls">
            <button id="export-file" onClick={(...args) => buttonClickCallback(...args)}>Download</button>
            </div>
            <div className="controls">
                <button id="save" className="button button--primary button--blue" onClick={(...args) => saveClickCallback(...args)}>Save data</button>
                <label>
                    <input type="checkbox" name="autosave" id="autosave" checked={isAutosave} onClick={(...args) => autosaveClickCallback(...args)} />
                    Autosave
                </label>
            </div>
            <output className="console" id="output">{output}</output>
        </>
    );
}
export default TwStandardCOA;