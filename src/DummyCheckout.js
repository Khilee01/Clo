import React from 'react';
import './DummyCheckout.css'
import { useEffect } from 'react';

export default function DummyCheckout() {
    useEffect(() => {
        // When the component mounts, add the 'dimmed' class to the body
        document.body.classList.add('dimmed');
    
        // When the component unmounts, remove the 'dimmed' class from the body
        return () => {
          document.body.classList.remove('dimmed');
        };
      }, []); 
  return (
    <div className="DummyCheckoutContainer">
        <div className='CheckoutSubContainer'>
            <div id='dummyHeaderSpan'></div>
            <div className='detailsFill'>
            <span>First Name</span>
            <input type='text' placeholder='John'></input>
            </div>
            <div className='detailsFill'>
            <span>Last Name</span>
            <input type='text' placeholder='Doe'></input>
            </div>
            <div className='detailsFill'>
            <span>E-Mail</span>
            <input type='email' placeholder='abcd@email.com'></input>
            </div><div id='fillerDiv'></div>
            <div className='detailsFill'>
            <span>Card Number</span>
            <input type='text' placeholder='5105105105105100'></input>
            </div>
            <div className='detailsFill'>
            <span>CVV</span>
            <input type='password' placeholder='****'></input>
            </div>
            <div className='detailsFill'>
            <span>Expiry</span>
            <input type='text' placeholder='MM/YY'></input>
            </div><div id='fillerDiv'></div>
            <div className='detailsFill'>
            <span>Address 1</span>
            <input type='text' placeholder='Street 1'></input>
            </div>
            <div className='detailsFill'>
            <span>Address 2</span>
            <input type='text' placeholder='City, State'></input>
            </div>
        </div>
    </div>
  );
}