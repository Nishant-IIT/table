import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { cvStandardCOAFormat } from '../Data/Data';
import React, { useEffect, useRef, useState } from 'react';

// register Handsontable's modules  
registerAllModules();

function CvStandardCOA() {
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
                data={cvStandardCOAFormat}
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
                        "readOnly": false,
                        "isRequired": true
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
                        "source": ['All', 'Compact', 'Mpv Suv', 'Mid Size','Ultra High End','Mini','High End','Quadricycle','Rest All']
                    },
                    {
                        "data": "VehicleClass",
                        "readOnly": true
                    },
                    {
                        "data": "Fuel Type",
                        "readOnly": false,
                        "type": 'dropdown',
                        "source": ['All', 'Diesel', 'CNG', 'Electric','Other Than Diesel']
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
export default CvStandardCOA;