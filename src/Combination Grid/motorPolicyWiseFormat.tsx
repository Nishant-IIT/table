import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import {  motorPolicyWiseFormat } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function  MotorPolicyWise() {
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
                data={motorPolicyWiseFormat}
                rowHeaders={true}
                colHeaders={['Policy Number', 'Producer Code', 'Producer name', 'Channel', 'Prodcom Month', 'LOB1', 'Segment', 'Business Type', 'Section Text', '(Policy Type)', 'On Net', '(Policy Component on which COA Applicable)', 'Approval Grid for OD Portion (Including IRDA+R&R+PO)', 'Approval Grid for TP Portion (Including IRDA+R&R+PO)', 'Approval Grid', 'for Per Policy', 'Tool %', 'Non Tool %', 'GV %', 'TP %', 'Sum of %']}
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
                        "data": "Policy Number",
                        "readOnly": true
                    },
                    {
                        "data": "Producer Code",
                        "readOnly": false
                    },
                    {
                        "data": "Producer name",
                        "readOnly": true
                    },
                    {
                        "data": "Channel",
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
                        "data": "Segment",
                        "readOnly": true
                    },
                    {
                        "data": "Business Type",
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
                        "data": "On Net",
                        "readOnly": true
                    },
                    {
                        "data": "(Policy Component on which COA Applicable)",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for OD Portion (Including IRDA+R&R+PO)",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for TP Portion (Including IRDA+R&R+PO)",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid",
                        "readOnly": true
                    },
                    {
                        "data": "for Per Policy",
                        "readOnly": true
                    },
                    {
                        "data": "Tool %",
                        "readOnly": true
                    },
                    {
                        "data": "Non Tool %",
                        "readOnly": true
                    },
                    {
                        "data": "GV %",
                        "readOnly": true
                    },
                    {
                        "data": "TP %",
                        "readOnly": true
                    },
                    {
                        "data": "Sum of %",
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
export default  MotorPolicyWise;