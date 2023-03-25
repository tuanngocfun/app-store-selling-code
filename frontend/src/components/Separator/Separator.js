import './separator.scss'
import { useState } from 'react';

function Separator(props){
    const [width, setWidth] = useState(props.status);    

    return(
        <div className={ width === '1' ? "separator wide" : width === '2' ? "separator wide" : width === '3' ? "separator medium" : "separator"}>
        </div>
    )
}

export default Separator;