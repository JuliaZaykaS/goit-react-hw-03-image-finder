import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalImage from '../ImageGalleryItem/ImageGalleryModal';
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
    largeImg: {
      url: "https://pixabay.com/get/gf91c2656bb7f3b01c0b8999a261b8d422d7fbb8b06485dee2ace7524384a64c170adcfe81e628057c28e937a432879e0a7078a69f2dc1a4fcbf980f2880afb26_1280.jpg",
      name: 'test',
    },
    showModal: false,
  };

  getSearchValue = searchValue => {
    this.setState({ searchValue });
  };

  // getLargeImage = largeImg => {
  //   this.setState({largeImg})
  // }
  // getLargeImage = () => {
  //   console.log('hello');
    
  // }

  toggleModal = e => {
    // e.preventDefault();
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getSearchValue} />
        <ImageGallery
          searchValue={this.state.searchValue}
          // onClickImg={() => {
          //   this.toggleModal();
          //   this.getLargeImage()
          // }}
          onClickImg={this.toggleModal}
          // openLargeImg={this.getLargeImage}
        />
        
        <Button onClickBtn={this.toggleModal} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage url={this.state.largeImg.url} name={this.state.largeImg.name }/>
          </Modal>
        )}
      </>
    );
  }
}

export default App;
