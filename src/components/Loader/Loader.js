import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { Component } from 'react';

export default function Spinner() {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
  )
  
}
// export default class App extends Component {
//   //other logic
//   render() {
//     return (
//       <Loader
//         type="Puff"
//         color="#00BFFF"
//         height={100}
//         width={100}
//         timeout={3000} //3 secs
//       />
//     );
//   }
// }