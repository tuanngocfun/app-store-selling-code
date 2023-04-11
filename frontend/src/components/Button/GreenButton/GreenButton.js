import './green.scss'
import { Link } from 'react-router-dom';

function GreenButton(prop){
    const title = prop.title
    return(
        <Link to = {prop.link === 'payment' ? "/cart/payment": "/"} className="green-button" onClick={prop.event}>{title}</Link>
    );
}

export default GreenButton;