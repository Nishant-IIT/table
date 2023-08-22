import { HotColumn, HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { pvtCarStandardCOAFormat } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

// const ScoreRenderer = (props) => {
//     const { value } = props;
//     const color = value > 1 && value < 100 ? '#2ECC40' : '#FF4136' ;
//     return (
//         <span style={{ color }}>{value}</span>
//     );
// };

function PvtCarStandardCOA() {
    const hotRef = useRef(null);
    const [output, setOutput] = useState('Data will load from server');
    const [isAutosave, setIsAutosave] = useState(false);

    const columnHeaders = Object.keys(pvtCarStandardCOAFormat[0]);

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
        const hot = hotRef.current?.hotInstance;
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
                data={pvtCarStandardCOAFormat}
                rowHeaders={true}
                colHeaders={columnHeaders}
                // height="auto"
                contextMenu={true}
                filters={true}
                // comments={true}
                columnSorting={true}
                dropdownMenu={['filter_by_condition', 'filter_by_value', 'filter_action_bar']}
                customBorders={true}

                columns={[
                    {
                        "data": "Approval Sr No",
                        "readOnly": false,
                        "isRequired": true,
                        "type": 'numeric'
                    },
                    {
                        "data": "Dates",
                        "readOnly": false,
                        "type": 'date',
                        "dateFormat": 'MM/DD/YYYY',
                        "correctFormat": true,
                        "defaultDate": '01/01/1900',
                        "datePickerConfig": {
                            // First day of the week (0: Sunday, 1: Monday, etc)
                            "firstDay": 0,
                            "showWeekNumber": true,
                            "licenseKey": 'non-commercial-and-evaluation',
                            // disableDayFn(date) {
                            //     // Disable Sunday and Saturday
                            //     return date.getDay() === 0 || date.getDay() === 6;
                            // }
                        }
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
                        "data": "Business Type",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Brand New', 'Roll Over', 'Renewal']

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
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Compact', 'Mpv Suv', 'Mid Size', 'Ultra High End', 'Mini', 'High End', 'Quadricycle', 'Rest All']
                    },
                    {
                        "data": "VehicleClass",
                        "readOnly": true
                    },
                    {
                        "data": "Fuel Type",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Diesel', 'CNG', 'Electric', 'Other Than Diesel']
                    },
                    {
                        "data": "Section Text ",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['Package', 'SAOD', 'SATP']
                    },
                    {
                        "data": "RTO State",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['ROWB', 'Kolkata', 'Pune', 'Nagpur', 'Ahmedabad', 'ROGJ', 'Rajkot', 'Surat', 'Baroda', 'Mumbai', 'Indore', 'UP1', 'ROOD', 'ROE', 'Andaman & Nicobar Islands', 'ROTN', 'Cochin', 'UP3', 'Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand', 'Haryana', 'Goa', 'UP2', 'Delhi', 'Hyderabad', 'Andra Pradesh', 'Daman & Diu', 'Chhattisgarh', 'Chennai', 'Pondicherry', 'Vijaywada', 'Vishakapatnam', 'Telengana', 'Kerala', 'Jaipur', 'Bangalore', 'Coimbatore', 'Bhubaneshwar', 'Jharkhand', 'Chandigarh', 'Bihar', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'KA1', 'KA2', 'MP1', 'MP2', 'MP3', 'PB1', 'PB2', 'RJ1', 'RJ2', 'RJ3', 'RJ4', 'RJ5', 'ROM1', 'ROM2', 'ROM3', 'ROM4', 'All', 'Dadra & Nagar Haveli', 'Sikkim', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Orissa', 'Madhya Pradesh', 'Gujrat', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Daman And Diu', 'Rest All']
                    },
                    {
                        "data": "RTO",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['ROWB', 'Kolkata', 'Pune', 'Nagpur', 'Ahmedabad', 'ROGJ', 'Rajkot', 'Surat', 'Baroda', 'Mumbai', 'Indore', 'UP1', 'ROOD', 'ROE', 'Andaman & Nicobar Islands', 'ROTN', 'Cochin', 'UP3', 'Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand', 'Haryana', 'Goa', 'UP2', 'Delhi', 'Hyderabad', 'Andra Pradesh', 'Daman & Diu', 'Chhattisgarh', 'Chennai', 'Pondicherry', 'Vijaywada', 'Vishakapatnam', 'Telengana', 'Kerala', 'Jaipur', 'Bangalore', 'Coimbatore', 'Bhubaneshwar', 'Jharkhand', 'Chandigarh', 'Bihar', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'ROE', 'KA1', 'KA2', 'MP1', 'MP2', 'MP3', 'PB1', 'PB2', 'RJ1', 'RJ2', 'RJ3', 'RJ4', 'RJ5', 'ROM1', 'ROM2', 'ROM3', 'ROM4', 'All', 'Dadra & Nagar Haveli', 'Sikkim', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Orissa', 'Madhya Pradesh', 'Gujrat', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Daman And Diu', 'Rest All']
                    },
                    {
                        "data": "With CPA",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Yes', 'No']
                    },
                    {
                        "data": "NCB",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Yes', 'No']
                    },
                    {
                        "data": "Vehicle Age Cat",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', '<=3 Yrs', '>3 Yrs']
                    },
                    {
                        "data": "Ensure Grid Applicability",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['Yes', 'No']
                    },
                    {
                        "data": "Lower Discount",
                        "readOnly": false,
                        type: 'numeric'
                    },
                    {
                        "data": "Upper Discount",
                        "readOnly": false,
                        type: 'numeric'
                    },
                    {
                        "data": "Business Slab",
                        "readOnly": true
                    },
                    {
                        "data": "Approval Grid for OD Portion",
                        "readOnly": false,
                        type: 'numeric'
                    },
                    {
                        "data": "Approval Grid for TP Portion",
                        "readOnly": false,
                        type: 'numeric'
                    },
                    {
                        "data": "Approval Grid for Per Policy ",
                        "readOnly": false,
                        type: 'numeric'


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
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            >
                {/* {columnHeaders.map((header) => (
                    <HotColumn key={header} data={header}>
                        {header === 'Lower Discount' ? (
                            <ScoreRenderer hot-renderer />
                        ) : <hot-renderer />}
                    </HotColumn>
                ))} */}
            </HotTable>

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
export default PvtCarStandardCOA;