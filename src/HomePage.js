import CategoryCard from './CategoryCard'
import './HomePage.css'

export default function HomePage() {

    const styleH6 = {
        marginLeft: "5%",
        direction: 'rtl'
    }

    return (
        <div className="homepg">
            <nav className='homepgCategoryCards'>
            <CategoryCard type='female'   />
            <div id='brandsCategory'>
            <CategoryCard type='brand' brandName='hnm'   />
            <CategoryCard type='brand' brandName='zara'   />
            <CategoryCard type='brand' brandName='uspolo'   />
            <CategoryCard type='brand' brandName='cartier'   />
            <CategoryCard type='brand' brandName='louis'   />
            <CategoryCard type='brand' brandName='gucci'   />
            </div>
            <CategoryCard type='male' />
            <h2 style={styleH6}>Anything & Everything <br />.At your doorstep</h2>
            </nav>
        </div>
    )
}