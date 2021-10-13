import'./FaceRecongniition.css';
const FaceRecongniition = ({imgUrl, box}) => {
	return(
		<div className='center ma'>
		     <div className='absolute mt2 ba bw2 white'>
			      <img src={imgUrl} 
			       id = 'inputimage'
			       alt=''
			       width='500px'
			       height='auto'/>
			       <div className='bounding-box'
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
			       ></div>
		     </div>
		</div>
		);
}

export default FaceRecongniition;