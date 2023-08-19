import { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
    const hotRef = useRef(null);
    const [output, setOutput] = useState('Click "Load" to load data from server');
    const [isAutosave, setIsAutosave] = useState(false);

    let loadClickCallback;
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

        loadClickCallback = () => {
            fetch('https://handsontable.com/docs/scripts/json/load.json')
                .then(response => {
                    response.json().then(data => {
                        hot.loadData(data.data);
                        // or, use `updateData()` to replace `data` without resetting states
                        setOutput('Data loaded');
                    });
                });
        };
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
                startRows={8}
                startCols={6}
                rowHeaders={true}
                colHeaders={true}
                height="auto"
                licenseKey="non-commercial-and-evaluation"
                afterChange={function (change, source) {
                    if (source === 'loadData') {
                        return; //don't save this change
                    }

                    if (!isAutosave) {
                        return;
                    }

                    fetch('https://handsontable.com/docs/scripts/json/save.json', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ data: change })
                    })
                        .then(response => {
                            setOutput(`Autosaved (${change.length} cell${change.length > 1 ? 's' : ''})`);
                            console.log('The POST request is only used here for the demo purposes');
                        });
                }}
            />

            <div className="controls">
                <button id="load" className="button button--primary button--blue" onClick={(...args) => loadClickCallback(...args)}>Load data</button>
                <button id="save" className="button button--primary button--blue" onClick={(...args) => saveClickCallback(...args)}>Save data</button>
                <label>
                    <input type="checkbox" name="autosave" id="autosave" checked={isAutosave} onClick={(...args) => autosaveClickCallback(...args)} />
                    Autosave
                </label>
            </div>

            <output className="console" id="output">{output}</output>
        </>
    );
};

ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
