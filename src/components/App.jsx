const uiTests = require('./ui/index.js');

const App = props => {
    return (
        <div>
            <h1>UI tests</h1>
            <ul>
            {Object.keys(uiTests).map(libName => (
                <li key={ libName }>
                    <a href={ `/ui?lib=${libName}` }>{ libName }</a>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default App;
