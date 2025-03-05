import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";

const MinCart = ({setCartPopupOpen,cartPopupOpen}) => {

     const cart = useSelector(state => state.cart.arr); // כדי להציג את הסל

    return (<>
      {/* מודל קטן להצגת הסל */}
      <Drawer open={cartPopupOpen} onClose={(e) => {e.preventDefault(); setCartPopupOpen(false)}} aria-labelledby="cart-popup-title" aria-describedby="cart-popup-description">
                <div style={{
                    textAlign: 'center',
                    backgroundColor: 'white', // רקע לבן
                    border: '1px solid black', // מסגרת שחורה בעובי 6 פיקסלים
                    width: '200px', // רוחב 200 פיקסלים
                    height: '100vh', // גובה כל העמוד
                    position: 'fixed', // מיקום קבוע
                    right: '0', // צמוד לצד ימין
                }}>
                    <h3 id="cart-popup-title">-   🛒  -</h3>
                    <ul>
                        {cart.map((cartItem) => (<li key={cartItem._id} style={{ listStyle: 'none', border: '1px solid gray', width: '80%', }}>
                            <h3 key={cartItem._id}>{cartItem.name} </h3>
                            <p>Quantit - {cartItem.qty}  </p>
                            <p>price - ${cartItem.price}</p>
                        </li>
                        ))}
                    </ul>
                </div>
            </Drawer>
    </>)
}
export default MinCart;