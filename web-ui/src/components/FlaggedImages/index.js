import { FlaggedImage, FlaggedImageList } from './styled'

const FlaggedImages = ({ flaggedImages }) => {
  return (
    <FlaggedImageList>
      {flaggedImages.map((image, index) => 
        <FlaggedImage key={`${image}-${index}`} alt={`flagged ${image}-${index}`} src={image.url} />
      )}
    </FlaggedImageList>
  )
}

export default FlaggedImages