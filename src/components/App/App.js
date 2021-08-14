import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import ModalImage from '../ImageGalleryItem/ImageGalleryModal';
import s from './App.module.css';
class App extends Component {
  state = {
    searchValue: '',
    largeImg: {},
    showModal: false,
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

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { largeImg, searchValue, showModal } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getSearchValue} />
        <ImageGallery
          searchValue={searchValue}
          onClickImg={this.toggleModal}
          getModalImage={this.getModalImage}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} clearModal={this.clearModalData}>
            <ModalImage
              url={largeImg.largeImageURL}
              name={largeImg.user}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
