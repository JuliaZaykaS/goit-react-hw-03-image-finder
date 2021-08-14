import { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImagesAPIService from '../services/images-api';
// import fetchImages from '../services/images-api';
// import apiImg from '../services/images-api';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

const imagesAPIService = new ImagesAPIService();

// export default function ImageGallery({ items }) {
//   return (
//     <ul className={s.ImageGallery}>
//       {items.map((item, index) => (
//         <ImageGalleryItem id={index} url={item.webformatURL} name={item.name} />
//       ))}
//     </ul>
//   );
// }
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class ImageGallery extends Component {
  state = {
    // images: null,
    images: [],
    error: null,
    status: Status.IDLE,
    // largeImg: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;
    // const prevImages = prevState.images;
    // const nextImages = this.state.images;

    // if (prevName !== nextName || prevImages!==nextImages) {
    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      // this.setState({ images: nextName, status: Status.PENDING });
      // apiImg
      //   .fetchImages(nextName)
      //   .then(images => {
      //     console.log(images);
      //     this.setState({ images: images.hits, status: Status.RESOLVED });
      //   })
      //   .catch(error => this.setState({ error, status: Status.REJECTED }));

      imagesAPIService.query = nextName;
      imagesAPIService.resetPage();
      // imagesAPIService.query = prevName;
      // this.loadImages();
      imagesAPIService
        .fetchImages()
        .then(images => {
          if (images.hits.length !== 0) {
            this.setState({ images: images.hits, status: Status.RESOLVED });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
      // .finally(() => this.setState({ status: Status.IDLE }));
    }
    // if (prevImages.includes(nextImages)) {
    // return
    // this.loadImages(nextImages);
    // }

    // if (prevImages !== nextImages) {
    // if (prevImages !== null && prevImages.contains(nextImages)) {
    // console.log(123);
    // this.setState({ status: Status.PENDING });
    // this.setState({ images: nextName, status: Status.PENDING });
    // apiImg
    //   .fetchImages(nextName)
    //   .then(images => {
    //     console.log(images);
    //     this.setState({ images: images.hits, status: Status.RESOLVED });
    //   })
    //   .catch(error => this.setState({ error, status: Status.REJECTED }));
    // imagesAPIService.incrementPage();
    // imagesAPIService
    //   .fetchImages()
    //   .then(images => {
    //     this.setState(prevState => {
    //       console.log(images);
    //       images = prevState.images.push(images)
    //     })
    //     // this.setState({ images: this.state.images.push(images.hits), status: Status.RESOLVED });
    //   })
    //   .catch(error => this.setState({ error, status: Status.REJECTED }));
    // }
  }

  loadImages = () => {
    this.setState({ status: Status.PENDING });
    // imagesAPIService.query = query;
    // imagesAPIService.incrementPage();

    imagesAPIService
      .fetchImages()
      .then(result => {
        this.setState(({ images, status }) =>
          // console.log(status);
          ({
            // console.log(result)
            images: [...images, ...result.hits],
            status: Status.RESOLVED,
            // images = prevState.images.push(...images.hits)
          }),
        );
        // if (result.hits.length !== 0) {

        //   this.setState(({ images, status }) => ({
        //     // console.log(result)
        //     images: [...images, ...result.hits],
        //     status: Status.RESOLVED,
        //     // images = prevState.images.push(...images.hits)
        //   }));
        // }
        // this.setState({ images: images.hits, status: Status.RESOLVED });
      })
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
    // this.loadImages();
    // console.log(123);
    // this.setState({ status: Status.IDLE});

    this.setState({ status: Status.PENDING });
    imagesAPIService.incrementPage();

    imagesAPIService
      .fetchImages()
      .then(result => {
        this.setState(({ images, status }) =>
          // console.log(status);
          ({
            // console.log(result)
            images: [...images, ...result.hits],
            status: Status.RESOLVED,
            // images = prevState.images.push(...images.hits)
          }),
        );
        // if (result.hits.length !== 0) {

        //   this.setState(({ images, status }) => ({
        //     // console.log(result)
        //     images: [...images, ...result.hits],
        //     status: Status.RESOLVED,
        //     // images = prevState.images.push(...images.hits)
        //   }));
        // }
        // this.setState({ images: images.hits, status: Status.RESOLVED });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
    // .finally(() => this.setState({ status: Status.IDLE }));
  };

  addLargeImg = e => {
    // console.log(e.target);
    // console.log(this.state.images);
    const largeImage = this.state.images.find(
      img => img.webformatURL === e.target.src,
      // (img.webformatURL === e.target.src) ? img : null;
    );
    // const largeImage = this.state.images.filter(img =>
    //   img.webformatURL === e.target.src
    //   // (img.webformatURL === e.target.src) ? img : null;
    // )
    // const largeImage = this.state.images.find(img => {
    //   // console.log(img);
    //   if (img.webformatURL === e.target.src) {

    //   } else return ;
    // (img.webformatURL === e.target.src) ? return img : return;
    // return {
    //   largeUrl: img.largeImageURL,
    //   name: img.user,
    // };
    // });
    // const findImage = this.state.images.find((img) => {
    //   if (img.webformatURL === e.target.src) { return img };
    // })
    // console.log(largeImage);
    // const largeImage = {
    //   largeUrl: img.largeImageURL,
    //   name: img.user,
    // }
    // this.setState({ largeImg: { url: largeImage.largeImageURL, name: largeImage.user } });
    // this.props.onClickImage(largeImage)
    this.props.onClickImg();
    // console.log(this.state.largeImg);
    this.props.getModalImage(largeImage);
    // this.props.openLargeImg();
  };

  // openLargeImg = (e) => {
  //   this.props.onClick(this.state.largeImg);
  // }
  // getVisibleImages = (newArr) => {
  //   // return this.state.images.reduce((image, acc) => {
  //   return newArr.reduce((image, acc) => {

  //     // if (!this.state.images.includes(image)) {
  //     //   return acc.push(image);
  //     // }
  //     return !this.state.images.includes(image) ?
  //       acc.push(image)
  //       : []
  //     }

  //   , [])
  // }

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      // return this.state.images === null
      //   ? null
      //   : this.setState({status: Status.RESOLVED})
      // if (status === 'idle' && this.state.images === null ) {
      // return this.state.images !== null
      //   ? (<>
      //     <ul className={s.ImageGallery}>
      //       {this.state.images.map((item, index) => (
      //         <ImageGalleryItem
      //           key={item.id}
      //           url={item.webformatURL}
      //           name={item.user}
      //           onClickImg={this.addLargeImg}
      //         />
      //       ))}
      //     </ul>
      //       <Button onClickBtn={ this.loadMoreImages }/>
      //   </>)
      //   : null;
      // }
      return null;
      // return <ul className={s.ImageGallery}></ul>;
    }
    // if (status === 'pending') {
    //   return <Loader />;
    //   // return <PokemonPendingView pokemonName={pokemonName} />;
    // }

    if (status === 'rejected') {
      return <div>{this.error.message}</div>;
    }

    // if (status === 'resolved' && this.state.images.length === 0) {
    //   return  (<div>Images not found</div>)
    //   // if (this.state.images.length === 0) {
    //   //   return (<div>Images not found</div>)
    //   }

    // if (status === 'resolved' && this.state.images.length !== 0) {
    //   return (
    //     <>
    //       <ul className={s.ImageGallery}>
    //         {this.state.images.map((item, index) => (
    //           <ImageGalleryItem
    //             key={item.id}
    //             // id={item.id}
    //             url={item.webformatURL}
    //             name={item.user}
    //             // onClickImg={this.props.onClickImg}
    //             // onClickImg={() => {
    //             //   this.addLargeImg();
    //             //   this.openLargeImg()
    //             // }}
    //             onClickImg={this.addLargeImg}
    //             // openLargeImg={this.openLargeImg}
    //           />
    //         ))}
    //       </ul>
    //         {/* <Button onClickBtn={ }/> */}
    //         <Button onClickBtn={ this.loadMoreImages }/>
    //     </>
    //   )
    // }

    // if (status === 'resolved' && this.state.images.length === 0) {
    if (status === 'resolved'  && this.state.images.length === 0) {
      return <div>Images not found</div>;
    }

    // if (status === 'resolved') {
    // return this.state.images.length === 0 ? (
    // return this.state.images === null ? (
    // return this.state.images.length === 0 ? (
    //   <div>Images not found</div>
    // ) : (
    //   <>
    //     <ul className={s.ImageGallery}>
    //       {this.state.images.map((item, index) => (
    //         <ImageGalleryItem
    //           key={item.id}
    //           // id={item.id}
    //           url={item.webformatURL}
    //           name={item.user}
    //           // onClickImg={this.props.onClickImg}
    //           // onClickImg={() => {
    //           //   this.addLargeImg();
    //           //   this.openLargeImg()
    //           // }}
    //           onClickImg={this.addLargeImg}
    //           // openLargeImg={this.openLargeImg}
    //         />
    //       ))}
    //     </ul>
    //     {/* <Button onClickBtn={ }/> */}
    //     <Button onClickBtn={this.loadMoreImages} />
    //   </>
    // );
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.state.images.map((item, index) => (
            <ImageGalleryItem
              key={item.id}
              // id={item.id}
              url={item.webformatURL}
              name={item.user}
              // onClickImg={this.props.onClickImg}
              // onClickImg={() => {
              //   this.addLargeImg();
              //   this.openLargeImg()
              // }}
              onClickImg={this.addLargeImg}
              // openLargeImg={this.openLargeImg}
            />
          ))}
        </ul>
        {/* <Button onClickBtn={ }/> */}
        {this.state.status === Status.PENDING && <Loader />}
        {this.state.images.length !== 0 && <Button onClickBtn={this.loadMoreImages} />}
      </>
    );
    // }

    // <h1>fhfhf</h1>
    // <h1>{this.state.images}</h1>
    // }
  }
}

//  render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === 'idle') {
//       return <div>Введите имя покемона.</div>;
//     }

//     if (status === 'pending') {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === 'rejected') {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === 'resolved') {
//       return <PokemonDataView pokemon={pokemon} />;
//     }
//   }
