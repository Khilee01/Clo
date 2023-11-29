import female_model from './assets/female_model.jpeg'
import male_model from './assets/male_model.jpeg'
import cartier_logo from './assets/cartier-logo.png'
import uspolo_logo from './assets/uspolo-logo.png'
import hnm_logo from './assets/hnm-logo.png'
import zara_logo from './assets/Zara-Logo.png'
import gucci_logo from './assets/Gucci-logo.png'
import louis_phillippe from './assets/Louis-Philippe-logo.jpg'
import { Link } from 'react-router-dom'
import './HomePage.css'

export default function CategoryCard(props) {
    var image_src = 0;
    var main_style = 0;
    const style_gender_f = {
        height: "60vh",
        width: '20vw',
        margin: '10px',
        "boxShadow": "2px 2px 4px rgba(0, 0, 0, 0.4)",
        marginTop: '70px',
        marginLeft: '50px'
    }

    const style_gender_m = {
        height: "45vh",
        width: '16vw',
        margin: '10px',
        "boxShadow": "2px 2px 4px rgba(0, 0, 0, 0.4)",
        marginTop: '140px',
    }

    const style_brand = {
        height: '10vh',
        width: '10vw'
    }
    if (props.type === 'female') {
        image_src = female_model;
        main_style = style_gender_f;
    } else if(props.type === 'male') {
        image_src = male_model;
        main_style = style_gender_m;
    } else if(props.type === 'brand') {
        main_style = style_brand;
        switch(props.brandName) {
            case 'cartier':
                image_src = cartier_logo;
                break;
            case 'hnm':
                image_src = hnm_logo;
                break;
            case 'zara':
                image_src = zara_logo;
                break;
            case 'uspolo':
                image_src = uspolo_logo;
                break;
            
            case 'louis':
                image_src = louis_phillippe;
                break;

            case 'gucci':
                image_src = gucci_logo;
                break;

            default:
                console.log('Error')
        }
    }

    return (
        <>
        <Link to="/products">
        <img id='categoryCards' src={image_src} style={main_style} alt="Error" />
        </Link>
        </>
    )
}