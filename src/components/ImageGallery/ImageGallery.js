import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
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
export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;


    if (prevName !== nextName) {
      // this.setState({ status: Status.PENDING, images:[] });
      this.setState({images:[] });


      imagesAPIService.query = nextName;
      imagesAPIService.resetPage();
      this.loadImages();

      // imagesAPIService
      //   .fetchImages()
      //   .then(images => {
      //     images.hits.length !== 0
      //       ? this.setState({ images: images.hits, status: Status.RESOLVED })
      //       : this.setState({ status: Status.RESOLVED });
      //   })
      //   .catch(error => this.setState({ error, status: Status.REJECTED }))
      //   .finally(() => {
      //     window.scrollTo({
      //       top: document.documentElement.scrollHeight,
      //       behavior: 'smooth',
      //     });
      //   });
    }
  }

  loadImages() {
    this.setState({ status: Status.PENDING });

    imagesAPIService
      .fetchImages()
      .then(images => {
          images.hits.length !== 0
            ? this.setState({ images: [...this.state.images, ...images.hits ], status: Status.RESOLVED })
            : this.setState({ status: Status.RESOLVED });
        })
      // .then(result => {
      //   this.setState(({ images, status }) => ({
      //     images: [...images, ...result.hits],
      //     status: Status.RESOLVED,
      //   }));
      // })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  loadMoreImages = () => {
    imagesAPIService.incrementPage();
    this.loadImages();

    // this.setState({ status: Status.PENDING });

    // imagesAPIService
    //   .fetchImages()
    //   .then(result => {
    //     this.setState(({ images, status }) => ({
    //       images: [...images, ...result.hits],
    //       status: Status.RESOLVED,
    //     }));
    //   })
    //   .catch(error => this.setState({ error, status: Status.REJECTED }))
    //   .finally(() => {
    //     window.scrollTo({
    //       top: document.documentElement.scrollHeight,
    //       behavior: 'smooth',
    //     });
    //   });
  };

  addLargeImg = e => {
    const largeImage = this.state.images.find(
      img => img.webformatURL === e.target.src,
    );

    this.props.onClickImg();

    this.props.getModalImage(largeImage);
  };

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return null;
    }

    if (status === 'rejected') {
      return <div>{this.error.message}</div>;
    }

    if (status === 'resolved' && this.state.images.length === 0) {
      return <div>Images not found</div>;
    }

    return (
      <>
        <ul className={s.ImageGallery}>
          {this.state.images.map((item, index) => (
            <ImageGalleryItem
              key={item.id}
              url={item.webformatURL}
              name={item.user}
              onClickImg={this.addLargeImg}
            />
          ))}
        </ul>

        {this.state.status === Status.PENDING && <Loader />}
        {this.state.images.length !== 0 && (
          <Button onClickBtn={this.loadMoreImages} />
        )}
      </>
    );
  }
}
