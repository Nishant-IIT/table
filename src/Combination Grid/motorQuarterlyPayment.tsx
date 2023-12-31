import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { motorQuarterlyPayment } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function MotorQuarterlyPayment() {
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
                data={motorQuarterlyPayment}
                rowHeaders={true}
                colHeaders={['Q4 Payment Refrence', 'producer_cd', 'Producer Name', 'Producer PAN', 'Product Name', 'section_text', 'Fuel_type', 'segment_type1', 'Business Type', 'Vehicle Class', 'RTO AS PER APPROVAL', 'QTR on OD (In % Only)', 'QTR on TP (In % Only)']}
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
                        "data": "Q4 Payment Refrence",
                        "readOnly": true
                    },
                    {
                        "data": "producer_cd",
                        "readOnly": true
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
                        "data": "Product Name",
                        "readOnly": true
                    },
                    {
                        "data": "section_text",
                        "readOnly": true
                    },
                    {
                        "data": "Fuel_type",
                        "readOnly": true
                    },
                    {
                        "data": "segment_type1",
                        "readOnly": true
                    },
                    {
                        "data": "Business Type",
                        "readOnly": true
                    },
                    {
                        "data": "Vehicle Class",
                        "readOnly": true
                    },
                    {
                        "data": "RTO AS PER APPROVAL",
                        "readOnly": true
                    },
                    {
                        "data": "QTR on OD (In % Only)",
                        "readOnly": true
                    },
                    {
                        "data": "QTR on TP (In % Only)",
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
export default MotorQuarterlyPayment;