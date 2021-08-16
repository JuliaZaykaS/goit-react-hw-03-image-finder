// import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

// export default class ImageGallery extends Component {
//   componentDidUpdate(prevProps) {
//     const prevName = prevProps.searchValue;
//     const nextName = this.props.searchValue;

//     if (prevName !== nextName) {
//       this.props.resetPages();
//       this.props.updateImages([]);

//       this.props.loadImages(nextName);
//     }
//   }

//   openLargeImg = value => {
//     this.props.onClickImg();
//     this.props.getModalImage(value);
//   };

//   render() {
//     const { status, images } = this.props;
//     if (status === 'idle') {
//       return null;
//     }

//     if (status === 'rejected') {
//       return <div>{this.error.message}</div>;
//     }

//     if (status === 'resolved' && images.length === 0) {
//       return <div className={s.notFound}>Images not found</div>;
//     }

//     return (
//       <>
//         <ul className={s.ImageGallery}>
//           {images.map((item) => (
//             <ImageGalleryItem
//               key={item.id}
//               url={item.webformatURL}
//               name={item.user}
//               onClickImg={this.openLargeImg}
//             />
//           ))}
//         </ul>
//       </>
//     );
//   }
// }
export default function ImageGallery({images, onImgClick}) {
  // componentDidUpdate(prevProps) {
  //   const prevName = prevProps.searchValue;
  //   const nextName = this.props.searchValue;

  //   if (prevName !== nextName) {
  //     this.props.resetPages();
  //     this.props.updateImages([]);

  //     this.props.loadImages(nextName);
  //   }
  // }

  // openLargeImg = value => {
  //   this.props.onClickImg();
  //   this.props.getModalImage(value);
  // };

  // render() {
    // const { status, images } = this.props;
    // if (status === 'idle') {
    //   return null;
    // }

    // if (status === 'rejected') {
    //   return <div>{this.error.message}</div>;
    // }

    // if (status === 'resolved' && images.length === 0) {
    //   return <div className={s.notFound}>Images not found</div>;
    // }

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map((item) => (
            <ImageGalleryItem
              key={item.id}
              url={item.webformatURL}
              name={item.user}
              // largeUrl={item.largeImageURL}
              onClickImg={onImgClick}
            />
          ))}
        </ul>
      </>
    );
  // }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
}
