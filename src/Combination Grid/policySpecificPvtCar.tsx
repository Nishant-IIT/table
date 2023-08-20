import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { policySpecificPvtCar } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function PolicySpecificPvtCar() {
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
                data={policySpecificPvtCar}
                rowHeaders={true}
                colHeaders={['Policy Wise', 'Client Name', 'Premium', 'Producer Code', 'Producer Name', 'Producer PAN', 'Channel', 'Sub-Channel', 'Branch Location', 'Location Category', 'Prodcom Month', 'LOB1', 'Business Type', 'Segment', 'Section Text', '(Policy Type)', 'Approval Grid for OD Portion', 'Approval Grid for TP Portion', 'Approval Grid for Per Policy ', 'Created By', 'Created By Code', 'Approved By', 'Approved By Code', 'Rejected By', 'Rejected By Code', 'Created On', 'Rejected On', 'Approved On', 'Modified On', 'Status', 'Mapped User', 'Mapped User Code', 'Reporting Manager', 'Reporting Manager Code']}
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
                        "data": "Policy Wise",
                        "readOnly": true
                    },
                    {
                        "data": "Client Name",
                        "readOnly": true
                    },
                    {
                        "data": "Premium",
                        "readOnly": true
                    },
                    {
                        "data": "Producer Code",
                        "readOnly": false
                    },
                    {
                        "data": "Producer Name",
                        "readOnly": true
                    },
                    {
                        "data": "Producer PAN",
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
                        "data": "Prodcom Month",
                        "readOnly": true
                    },
                    {
                        "data": "LOB1",
                        "readOnly": true
                    },
                    {
                        "data": "Business Type",
                        "readOnly": true
                    },
                    {
                        "data": "Segment",
                        "readOnly": true
                    },
                    {
                        "data": "Section Text",
                        "readOnly": true
                    },
                    {
                        "data": "(Policy Type)",
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
                    },
                    {
                        "data": "Mapped User",
                        "readOnly": true
                    },
                    {
                        "data": "Mapped User Code",
                        "readOnly": true
                    },
                    {
                        "data": "Reporting Manager",
                        "readOnly": true
                    },
                    {
                        "data": "Reporting Manager Code",
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
export default PolicySpecificPvtCar;