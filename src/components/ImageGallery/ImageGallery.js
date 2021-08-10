import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import ImagesAPIService from '../services/images-api';


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
    images: [],
    error: null,
    status: Status.IDLE,
  };
  
    componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;

    if (prevName !== nextName) {
        this.setState({ status: Status.PENDING });

        imagesAPIService
            .fetchImages()
        //     .then(images => {
            
        // })
        
        

    
        // pokemonAPI
        //   .fetchPokemon(nextName)
        //   .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        //   .catch(error => this.setState({ error, status: Status.REJECTED }));
    
    }
  }
  
    render() {
      
        return(
        <ul className={s.ImageGallery}>
          {this.state.images.map((item, index) => (
            <ImageGalleryItem id={index} url={item.webformatURL} name={item.name} />
          ))}
        </ul>
      );
  }
}
