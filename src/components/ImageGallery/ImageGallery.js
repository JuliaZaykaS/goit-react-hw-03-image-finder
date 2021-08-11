import { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import ImagesAPIService from '../services/images-api';
// import fetchImages from '../services/images-api';
import apiImg from '../services/images-api';
import Loader from '../Loader/Loader';

// const imagesAPIService = new ImagesAPIService();

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
    images: null,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      // this.setState({ images: nextName, status: Status.PENDING });
      apiImg
        .fetchImages(nextName)
        .then(images => {
          console.log(images);
          this.setState({ images: images.hits, status: Status.RESOLVED });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));

      // imagesAPIService.query = nextName;
      // imagesAPIService.query = prevName;
      //   imagesAPIService
      //       .fetchImages()
      //     .then(images => {
      //       this.setState({ images: images.hint })

      //   })

      // pokemonAPI
      //   .fetchPokemon(nextName)
      //   .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
      //   .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <div>введите запрос</div>;
    }
    if (status === 'pending') {
      return <Loader />;
      // return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === 'rejected') {
      return <div>{this.error.message}</div>;
    }

    if (status === 'resolved') {
      return this.state.images.length === 0 ? (
        <div>Images not found</div>
      ) : (
        <ul className={s.ImageGallery}>
          {this.state.images.map((item, index) => (
            <ImageGalleryItem
              key={item.id}
              // id={item.id}
              url={item.webformatURL}
              name={item.user}
            />
          ))}
        </ul>
      );

      // <h1>fhfhf</h1>
      // <h1>{this.state.images}</h1>
    }
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
