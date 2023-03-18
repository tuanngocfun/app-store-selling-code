import './green.scss'
import { Link } from 'react-router-dom';

function GreenButton(prop){
    const title = prop.title
    return(
        <Link className="green-button">{title}</Link>
    );
}

export default GreenButton;