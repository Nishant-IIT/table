import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { coaHealthIPA } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function CoaHealthIPA() {
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
                data={coaHealthIPA}
                rowHeaders={true}
                colHeaders={['Special Approval Grid Master (Health & IPA)', 'column_1', 'column_2', 'column_3', 'column_4', 'column_5', 'Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab', 'column_7', 'column_8', 'column_9', 'column_10', 'column_11', 'column_12', 'column_13', 'column_14', 'column_15', 'column_16', 'column_17', 'column_18', 'column_19', 'column_20', 'column_21', 'column_22', 'column_23', 'column_24', 'column_25', 'column_26', 'column_27', 'column_28', 'column_29', 'column_30', 'column_31', 'column_32', 'column_33', 'column_34', 'column_35', 'column_36', 'column_37', 'column_38', 'column_39', 'column_40', 'column_41', 'column_42', 'column_43', 'column_44', 'column_45', 'column_46', 'column_47', 'column_48', 'column_49', 'column_50', 'IPA', 'column_52']}
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
                        "data": "Special Approval Grid Master (Health & IPA)",
                        "readOnly": true
                    },
                    {
                        "data": "column_1",
                        "readOnly": true
                    },
                    {
                        "data": "column_2",
                        "readOnly": true
                    },
                    {
                        "data": "column_3",
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
                        "data": "Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab                                                  Health Payout Slab",
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
                    },
                    {
                        "data": "column_12",
                        "readOnly": true
                    },
                    {
                        "data": "column_13",
                        "readOnly": true
                    },
                    {
                        "data": "column_14",
                        "readOnly": true
                    },
                    {
                        "data": "column_15",
                        "readOnly": true
                    },
                    {
                        "data": "column_16",
                        "readOnly": true
                    },
                    {
                        "data": "column_17",
                        "readOnly": true
                    },
                    {
                        "data": "column_18",
                        "readOnly": true
                    },
                    {
                        "data": "column_19",
                        "readOnly": true
                    },
                    {
                        "data": "column_20",
                        "readOnly": true
                    },
                    {
                        "data": "column_21",
                        "readOnly": true
                    },
                    {
                        "data": "column_22",
                        "readOnly": true
                    },
                    {
                        "data": "column_23",
                        "readOnly": true
                    },
                    {
                        "data": "column_24",
                        "readOnly": true
                    },
                    {
                        "data": "column_25",
                        "readOnly": true
                    },
                    {
                        "data": "column_26",
                        "readOnly": true
                    },
                    {
                        "data": "column_27",
                        "readOnly": true
                    },
                    {
                        "data": "column_28",
                        "readOnly": true
                    },
                    {
                        "data": "column_29",
                        "readOnly": true
                    },
                    {
                        "data": "column_30",
                        "readOnly": true
                    },
                    {
                        "data": "column_31",
                        "readOnly": true
                    },
                    {
                        "data": "column_32",
                        "readOnly": true
                    },
                    {
                        "data": "column_33",
                        "readOnly": true
                    },
                    {
                        "data": "column_34",
                        "readOnly": true
                    },
                    {
                        "data": "column_35",
                        "readOnly": true
                    },
                    {
                        "data": "column_36",
                        "readOnly": true
                    },
                    {
                        "data": "column_37",
                        "readOnly": true
                    },
                    {
                        "data": "column_38",
                        "readOnly": true
                    },
                    {
                        "data": "column_39",
                        "readOnly": true
                    },
                    {
                        "data": "column_40",
                        "readOnly": true
                    },
                    {
                        "data": "column_41",
                        "readOnly": true
                    },
                    {
                        "data": "column_42",
                        "readOnly": true
                    },
                    {
                        "data": "column_43",
                        "readOnly": true
                    },
                    {
                        "data": "column_44",
                        "readOnly": true
                    },
                    {
                        "data": "column_45",
                        "readOnly": true
                    },
                    {
                        "data": "column_46",
                        "readOnly": true
                    },
                    {
                        "data": "column_47",
                        "readOnly": true
                    },
                    {
                        "data": "column_48",
                        "readOnly": true
                    },
                    {
                        "data": "column_49",
                        "readOnly": true
                    },
                    {
                        "data": "column_50",
                        "readOnly": true
                    },
                    {
                        "data": "IPA",
                        "readOnly": true
                    },
                    {
                        "data": "column_52",
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
export default CoaHealthIPA;