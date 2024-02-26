import { LazyLoadImage } from 'react-lazy-load-image-component' 

export const LazyImage = ({ src, alt , width, height, onClick }) => {
  return (
    <LazyLoadImage 
      onClick={onClick}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}