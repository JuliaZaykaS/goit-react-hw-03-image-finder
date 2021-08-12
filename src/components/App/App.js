import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
// import Button from '../Button/Button';
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
    largeImg: {},
    showModal: false,
    // renderGallery: false,
  };

  getSearchValue = searchValue => {
    this.setState({ searchValue });
  };

  getModalImage = largeImg => {
    this.setState({ largeImg });
  };

  clearModalData = () => {
    this.setState({ largeImg: {} });
  };

  // clickLoadMoreBtn = e => {
  //   this.setState(({ renderGallery }) => ({
  //     renderGallery: true,
  //   }));
    // this.setState({renderGallery: true});
    // clickLoadMoreBtn = () => {
    //   this.setState(({ emptyGallery }) => ({
    //     emptyGallery: !emptyGallery,
    //   }));
    // imagesAPIService.query = this.state.searchValue;
    // imagesAPIService
    //         .fetchImages()
  // };

  // renderModal = () => {
  //   this.toggleModal();
  //   this.getModalImage(this.state.largeImg);

  // }

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
          // onClickImage={() => {

          //   this.toggleModal();
          //   this.getModalImage();

          // }}
          // onClickImage={this.renderModal(this.state.largeImg)}

          onClickImg={this.toggleModal}
          getModalImage={this.getModalImage}
          // openLargeImg={this.getLargeImage}
        />
        {/* {this.state.emptyGallery && (<Button onClickBtn={this.clickLoadMoreBtn} />) } */}
        {/* <Button onClickBtn={this.clickLoadMoreBtn} /> */}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal} clearModal={this.clearModalData}>
            {/* <ModalImage url={this.state.largeImg.url} name={this.state.largeImg.name }/> */}
            <ModalImage
              url={this.state.largeImg.largeImageURL}
              name={this.state.largeImg.user}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
