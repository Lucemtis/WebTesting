import React, { useEffect } from "react";

import './styles/basic.scss';

import CyberFrameStyle from "./components/CyberFrameStyle";
import GridBackground from "./components/GridBackground";
import RandomPhrase from "./components/RandomPhrase";

function App() {

    useEffect(() => {
        // Initialisez script ici
    }, []);

    return (
        <>

            <CyberFrameStyle />
            <GridBackground />

            <RandomPhrase />
        </>
    );
}

export default App;