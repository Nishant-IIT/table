import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Pvt_Car_Standard_COA_Format } from './Data';

// register Handsontable's modules
registerAllModules();

function Home() {
    return (
        <HotTable
            data={Pvt_Car_Standard_COA_Format}
            rowHeaders={true}
            colHeaders={['Channel', 'Sub-Channel', 'Branch Location', 'Location Category', 'LOB', '(Product)', 'Business Type', 'Make', 'Model', 'Cubic Capacity', 'Segment', 'VehicleClass', 'Fuel Type', 'Section Text ', 'RTO State', 'RTO', 'With CPA', 'NCB', 'Vehicle Age Cat', 'Lower Discount', 'Upper Discount', 'Business Slab', 'Approval Grid for OD Portion', 'Approval Grid for TP Portion', 'Approval Grid for Per Policy ']}
            // height="auto"
            height={320}
            fixedRowsTop={1}
            licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            // className="htCenter"
            contextMenu={true}
            comments={true}
            stretchH="all"
            columns={[
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
    );
}
export default Home;