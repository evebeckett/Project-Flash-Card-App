import React from 'react';
import {useLocation} from "react-router-dom";

function NoMatch() {
    const location = useLocation();
    return <h1>Not Found</h1>;
}

export default NoMatch;