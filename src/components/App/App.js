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
    showModal: false,
  };

  getSearchValue = searchValue => {
    this.setState({ searchValue });
  };

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
          onClickImg={this.toggleModal}
        />
        
        <Button onClickBtn={this.toggleModal} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
