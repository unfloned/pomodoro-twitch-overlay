import ReactDOM from 'react-dom/client'
import {App} from "./app.tsx";
import {MantineProvider} from "@mantine/core";
import {TimeProvider} from "./provider/pomodoro.tsx";

import '@mantine/core/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <TimeProvider>
            <App />
        </TimeProvider>
    </MantineProvider>,
)
