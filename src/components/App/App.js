import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import ModalImage from '../ImageGalleryItem/ImageGalleryModal';
import s from './App.module.css';
import ImagesAPIService from '../services/images-api';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

const imagesAPIService = new ImagesAPIService();
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class App extends Component {
  state = {
    searchValue: '',
    largeImg: {},
    showModal: false,
    error: null,
    images: [],
    status: Status.IDLE,
  };

  getSearchValue = searchValue => {
    this.setState({ searchValue });
  };

  getModalImage = largeImg => {
    this.setState({ largeImg });
  };

  updateImages = value => {
    this.setState({ images: value });
  };

  resetPages = () => {
    imagesAPIService.resetPage();
  };

  clearModalData = () => {
    this.setState({ largeImg: {} });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMoreImages = () => {
    // imagesAPIService.query = this.state.searchValue;
    imagesAPIService.incrementPage();
    this.loadImages(this.state.searchValue);
  };

  addLargeImg = e => {
    const largeImage = this.state.images.find(
      img => img.webformatURL === e.target.src,
    );
    this.setState({largeImg: largeImage})
    // this.toggleModal();
    // this.getModalImage(largeImage);

    // this.props.onClickImg();
    // this.props.getModalImage(largeImage);
  };

  // loadImages=() =>{
  loadImages = value => {
    this.setState({ status: Status.PENDING });
    imagesAPIService.query = value;

    imagesAPIService
      .fetchImages()
      .then(images => {
        images.hits.length !== 0
          ? this.setState({
              images: [...this.state.images, ...images.hits],
              status: Status.RESOLVED,
            })
          : this.setState({ status: Status.RESOLVED });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    const { largeImg, searchValue, showModal } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getSearchValue} />
        <ImageGallery
          searchValue={searchValue}

          // onClickImg={this.addLargeImg}
          onClickImg={this.toggleModal}
          // getModalImage={this.getModalImage}
          getModalImage={this.addLargeImg}
          images={this.state.images}
          status={this.state.status}
          loadImages={this.loadImages}
          resetPages={this.resetPages}
          updateImages={this.updateImages}
        />
        {this.state.status === Status.PENDING && <Loader />}
        {this.state.images.length !== 0 && (
          // <Button onClickBtn={this.loadMoreImages(this.state.searchValue)} />
          <Button onClickBtn={()=>this.loadMoreImages(this.state.searchValue)} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} clearModal={this.clearModalData}>
            <ModalImage url={largeImg.largeImageURL} name={largeImg.user} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
