import './separator.scss'
import { useState } from 'react';

function Separator(props){
    const [width, setWidth] = useState(props.status);    

    return(
        <div className={ width === '1' ? "separator wide" : width === '2' ? "separator tight" : "separator"}>
        </div>
    )
}

export default Separator;