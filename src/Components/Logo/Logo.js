import Tilt from 'react-tilt';
import Brain from './Brain.png'
import './Logo.css';

const tiltOptions = {
         max : 25,
         perspective:200, 
         transition:true
}

const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={tiltOptions} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-inner pa3"> 
				    <img src={Brain} alt='LOGO'/>
				 </div>
			</Tilt>
		</div>
		)
}

export default Logo;