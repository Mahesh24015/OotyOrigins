import item_product_1 from '../../Assets/images/item_product_1.png'
import item_product_2 from '../../Assets/images/item_product_2.png'
import item_product_3 from '../../Assets/images/item_product_3.png'
import item_product_4 from '../../Assets/images/item_product_4.png'
import item_product_5 from '../../Assets/images/item_product_5.png'
import item_product_6 from '../../Assets/images/item_product_6.png'
import item_product_7 from '../../Assets/images/item_product_7.png'
import item_product_8 from '../../Assets/images/item_product_8.png'
import item_product_9 from '../../Assets/images/item_product_9.png'
import item_product_10 from '../../Assets/images/item_product_10.png'
import { useNavigate } from "react-router-dom";

export function Categories(props) {
    const navigate = useNavigate();

    const categories = props.categories;


    var imageobjs = {
        "Jewelry": item_product_1,
        "Home Decor": item_product_2,
        "Clothing": item_product_3,
        "Food & Beverages": item_product_4,
        "Handicraft": item_product_5,
        "Personal Care": item_product_6,
        "Kitchenware": item_product_7,
        "Furniture": item_product_8,
        "Toys & Games": item_product_9,
        "Organic Rice": item_product_10,

    }


    const redirectWithState = (val) => {
        navigate('/category', val);
    };
    return (
        <div>
            {categories.map((key, index) => (
                <a onClick={() => { redirectWithState({ state: { name: key.name } }) }} >
                    <li style={{ display: 'inline-block', padding: '35px' }}>
                        <img className="explore-categories" src={imageobjs[key.name]} width={"150px"} height={"150px"} />
                        <a className="categoriesList">
                            {key.name}
                        </a>
                    </li>
                </a>
            ))}


        </div>
    );
}