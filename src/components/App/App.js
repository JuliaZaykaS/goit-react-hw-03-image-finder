import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
// import ImagesAPIService from '../services/images-api';


// const imagesAPIService = new ImagesAPIService();
// function App() {
//   return (
//     <>
//       <Searchbar onSubmit={ }/>
//     </>
//   );
// }
class App extends Component {
  state = {
    searchValue: '',

  }

  getSearchValue = (searchValue) => {
    this.setState({searchValue})
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getSearchValue} />
        <ImageGallery searchValue={ this.state.searchValue}/>
      </>
      
    )
  }
}

export default App;
