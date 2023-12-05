import './SupportPage.css'
import './App.css'
import instagram from './assets/logo-instagram-2454.png'
import facebook from './assets/facebook-logo-493.png'
import pinterest from './assets/pinterest-logo-png-2012.png'
import youtube from './assets/youtube-logo-png-2069.png'
import twitter from './assets/twitter-x-logo-42554.png'

const Scrolldown = () => {
  window.scroll(0,900); 
}


export default function SupportPage() {
    return (
        <div className="SupportPg" onLoad={Scrolldown}>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />            <h2>We're also on</h2>
            <div className="Sup-rt">
              <h3>Let’s design it together</h3>
            </div>
            <div className="Sup-social">
              <a href="https://www.instagram.com/clo_pune/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/CLO-Pune-104921274689731/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com/CLO_Pune" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://www.pinterest.com/clo_pune/" target="_blank" rel="noopener noreferrer">Pinterest</a>
              <a href="https://www.youtube.com/channel/UCfRwfFhgfqLHuWtUrFxOxSQ" target="_blank" rel="noopener noreferrer">Youtube</a>
            </div>
            <div id='SocialImages'>
              <img src={instagram} />
              <img src={facebook} />
              <img src={twitter} />
              <img src={pinterest} />
              <img src={youtube} />
            </div>
            <div className="Sup-footer">
              <p>Pune,India</p>
              <a href="https://reactjs.org/" className="Sup-link">www.clo.com</a>
              <div id='Phone-Num'>
                <span id='contact'>Our Contact: <span class="material-symbols-outlined">call</span>0000-88888</span>
              </div>
            </div>
        </div>
     );
    
}