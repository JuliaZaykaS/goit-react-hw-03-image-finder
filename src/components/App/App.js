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

  componentDidUpdate(prevProps, prevState) {
  // componentDidUpdate(prevState) {
    const prevName = prevState.searchValue;
    const nextName = this.state.searchValue;

    if (prevName !== nextName) {
      this.setState({images:[]})
      // this.props.resetPages();
      imagesAPIService.resetPage();

      // this.props.updateImages([]);

      // this.props.loadImages(nextName);
      this.loadImages(nextName);
    }
  }



  // getNewValue = (value) => {
  //   this.setState({[value]: value})
  // }

  getSearchValue = searchValue => {
    this.setState({ searchValue });
  };

  // getModalImage = largeImg => {
  //   this.setState({ largeImg });
  // };

  // updateImages = value => {
  //   this.setState({ images: value });
  // };

  // resetPages = () => {
  //   imagesAPIService.resetPage();
  // };

  clearModalData = () => {
    this.setState({ largeImg: {} });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMoreImages = () => {
    imagesAPIService.incrementPage();
    this.loadImages(this.state.searchValue);
  };

  // addLargeImg = e => {
  openModalImg = e => {

    const largeImage = this.state.images.find(
      img => img.webformatURL === e.target.src,
    );
    // console.log(largeImage);
    this.setState({ largeImg: largeImage });
    this.toggleModal();
  };

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
    const { largeImg, searchValue, showModal, images, status } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getSearchValue} />
        {/* <Searchbar onSubmit={this.getNewValue} /> */}
        {status === Status.IDLE && null}
        {status === Status.REJECTED && <div>{this.error.message}</div>}
        {status === Status.RESOLVED && images.length === 0 && <div className={s.notFound}>Images not found</div>}
        <ImageGallery
          // searchValue={searchValue}
          // onClickImg={this.toggleModal}
          // onImgClick={this.toggleModal}
          onImgClick={this.openModalImg}
          // getModalImage={this.addLargeImg}
          images={images}
          // status={status}
          // loadImages={this.loadImages}
          // resetPages={this.resetPages}
          // updateImages={this.updateImages}
        />
        {status === Status.PENDING && <Loader />}
        {images.length !== 0 && (
          <Button onClickBtn={() => this.loadMoreImages(searchValue)} />
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
