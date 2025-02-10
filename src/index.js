import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import gerador from "./gerador.js";
import CurriculON from './index.jsx';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider gerador={gerador}>
            <CurriculON />
        </Provider>
    </React.StrictMode>
);