import { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecongniition from './Components/FaceRecongniition/FaceRecongniition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
import particlesOptions from './config/particles-config';

const intitialState = {
  input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
  
}

class App extends Component {
  constructor(){
    super();
    this.state = intitialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (resp) => {
     const calrifaiData = resp.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
      leftCol: calrifaiData.left_col * width,
      topRow: calrifaiData.top_row * height,
      rightCol: width - (calrifaiData.right_col * width),
      bottomRow: height - (calrifaiData.bottom_row * height)
     }

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});

  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    fetch('https://young-basin-95333.herokuapp.com/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
          if(response){
            fetch('https://young-basin-95333.herokuapp.com/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
      if(route === 'signout'){
            this.setState(intitialState)
           } else if(route === 'home'){
               this.setState({isSignedIn: true})
         }
      this.setState({route: route});
    }



  render(){
   const { isSignedIn, imgUrl, route, box } = this.state;
      return (
        <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' 
            ? <div> 
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                    onInputChange = {this.onInputChange} 
                    onButtonSubmit = {this.onButtonSubmit}
                  />
                <FaceRecongniition box={box} imgUrl={imgUrl}/>
              </div>
            : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }
        </div>
       );
    }
  }

export default App;