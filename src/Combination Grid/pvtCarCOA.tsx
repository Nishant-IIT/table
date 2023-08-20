import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { pvtCarCOA } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function PvtCarCOA() {
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
                data={pvtCarCOA}
                rowHeaders={true}
                colHeaders={['column_0', 'Motor Producer Specefic COA', 'column_2', 'CSM to Enter', 'column_4', 'column_5', 'column_6', 'column_7', 'column_8', 'column_9', 'column_10', 'column_11']}
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
                        "data": "column_0",
                        "readOnly": true
                    },
                    {
                        "data": "Motor Producer Specefic COA",
                        "readOnly": true
                    },
                    {
                        "data": "column_2",
                        "readOnly": true
                    },
                    {
                        "data": "CSM to Enter",
                        "readOnly": true
                    },
                    {
                        "data": "column_4",
                        "readOnly": true
                    },
                    {
                        "data": "column_5",
                        "readOnly": true
                    },
                    {
                        "data": "column_6",
                        "readOnly": true
                    },
                    {
                        "data": "column_7",
                        "readOnly": true
                    },
                    {
                        "data": "column_8",
                        "readOnly": true
                    },
                    {
                        "data": "column_9",
                        "readOnly": true
                    },
                    {
                        "data": "column_10",
                        "readOnly": true
                    },
                    {
                        "data": "column_11",
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
export default PvtCarCOA;