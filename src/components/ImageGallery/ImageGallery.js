import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import ImagesAPIService from '../services/images-api';

// import Loader from '../Loader/Loader';
// import Button from '../Button/Button';

// const imagesAPIService = new ImagesAPIService();

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };
export default class ImageGallery extends Component {
  // state = {
  //   images: [],
  //   // error: null,
  //   // status: Status.IDLE,
  // };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;
    // const prevImages = prevProps.images;
    // const nextImages = this.props.images;

    if (prevName !== nextName) {
      // this.setState({ images: [] });
      // this.props.images = [];
      // console.log(prevImages);
      // console.log(nextImages);
      // console.log(this.props.images);
      // console.log(prevName);
      // console.log(nextName);
      // console.log(imagesAPIService.query);
      // this.props.updateImages(this.props.images);
      // imagesAPIService.resetPage();
      this.props.resetPages();
      this.props.updateImages([]);
      // imagesAPIService.query = nextName;
      // console.log(imagesAPIService.query);
      // this.loadImages();
      this.props.loadImages(nextName);
    }
  }

  // loadImages() {
  //   this.setState({ status: Status.PENDING });

  //   imagesAPIService
  //     .fetchImages()
  //     .then(images => {
  //       images.hits.length !== 0
  //         ? this.setState({
  //             images: [...this.state.images, ...images.hits],
  //             status: Status.RESOLVED,
  //           })
  //         : this.setState({ status: Status.RESOLVED });
  //     })
  //     .catch(error => this.setState({ error, status: Status.REJECTED }))
  //     .finally(() => {
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: 'smooth',
  //       });
  //     });
  // }

  // loadMoreImages = () => {
  //   imagesAPIService.incrementPage();
  //   this.loadImages();
  // };

  openLargeImg = value => {
  // openLargeImg = () => {
    this.props.onClickImg();
    this.props.getModalImage(value);
  };
  // addLargeImg = value => {
  //   this.props.onClickImg();
  //   this.props.getModalImage(value);
  // };
  // addLargeImg = e => {
  //   const largeImage = this.state.images.find(
  //     img => img.webformatURL === e.target.src,
  //   );

  //   this.props.onClickImg();
  //   this.props.getModalImage(largeImage);
  // };
  // addLargeImg = e => {

  //   this.props.onClickImg();
  //   // this.props.getModalImage(largeImage);
  // };

  render() {
    // const { status } = this.state;
    const { status } = this.props;
    if (status === 'idle') {
      return null;
    }

    if (status === 'rejected') {
      return <div>{this.error.message}</div>;
    }

    // if (status === 'resolved' && this.state.images.length === 0) {
    if (status === 'resolved' && this.props.images.length === 0) {
      return <div>Images not found</div>;
    }

    return (
      <>
        <ul className={s.ImageGallery}>
          {this.props.images.map((item, index) => (
            <ImageGalleryItem
              key={item.id}
              url={item.webformatURL}
              name={item.user}
              // onClickImg={()=>this.addLargeImg(value)}
              // onClickImg={this.props.openLargeImage}
              // onClickImg={this.props.}
              // onClickImg={this.props.}
              onClickImg={this.openLargeImg}
            />
          ))}
        </ul>

        {/* {this.props.status === Status.PENDING && <Loader />}
        {this.props.images.length !== 0 && (
          <Button onClickBtn={this.loadMoreImages} />
        )} */}
        {/* <ul className={s.ImageGallery}>
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
        )} */}
      </>
    );
  }
}
