import { PlaceImage } from '@/models/place_image'
import { Image, Stack, Text } from '@chakra-ui/react'
import { MouseEventHandler, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const galleryStyles = {
  rounded: 'md',
  width: {
    base: '80%',
    md: '100%',
  },
  margin: 'auto',
}

const imageStyles = {
  rounded: 'md',
  width: {
    md: '100%',
  },
  margin: 'auto',
}

const sidebarActionStyles = {
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  padding: '.5rem',
  position: 'absolute',
  transition: '300ms',
}

const sidebarActionStyles_hover = {
  background: '#eeeeee5f',
}

const controllIconStyles = {
  background: '#38A169cc',
  borderRadius: '15px',
  color: '#dddddd',
  cursor: 'pointer',
}

interface Props {
  imageList: PlaceImage[]
  showTotal?: boolean
  fixedImageHeight?: string
  imageClick?: MouseEventHandler<HTMLDivElement> | undefined
}

export const ImageGallery = ({
  imageList,
  showTotal,
  fixedImageHeight,
  imageClick,
}: Props) => {
  const [displayedIndex, setDisplayedIndex] = useState(0)

  const displayedImage =
    imageList[displayedIndex] && imageList[displayedIndex].image
      ? imageList[displayedIndex].image
      : {
          url: 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'padron',
        }

  const isPossibleToGoBack = !!imageList[displayedIndex - 1]
  const isPossibleToGoForward = !!imageList[displayedIndex + 1]

  function move(movement: 'back' | 'forward') {
    if (movement === 'back' && isPossibleToGoBack)
      return setDisplayedIndex(displayedIndex - 1)

    if (movement === 'forward' && isPossibleToGoForward)
      setDisplayedIndex(displayedIndex + 1)
  }

  return (
    <Stack
      style={{
        position: 'relative',
      }}
      sx={galleryStyles}
    >
      <Stack
        sx={{
          ...sidebarActionStyles,
          left: 0,
          display: isPossibleToGoBack ? 'flex' : 'none',
        }}
        _hover={sidebarActionStyles_hover}
      >
        <RiArrowLeftSLine
          size={36}
          style={{
            ...controllIconStyles,
          }}
          onClick={() => move('back')}
        />
      </Stack>
      <Image
        src={displayedImage.url}
        alt={displayedImage.alt}
        sx={imageStyles}
        height={fixedImageHeight}
        objectFit="cover"
        onClick={imageClick}
      />
      <Stack
        sx={{
          ...sidebarActionStyles,
          right: 0,
          display: isPossibleToGoForward ? 'flex' : 'none',
        }}
        _hover={sidebarActionStyles_hover}
      >
        <RiArrowRightSLine
          size={36}
          style={{
            ...controllIconStyles,
          }}
          onClick={() => move('forward')}
        />
      </Stack>

      {showTotal ? (
        <Text textAlign="center" fontSize=".8rem">
          {displayedIndex + 1}/{imageList.length}
        </Text>
      ) : (
        <></>
      )}
    </Stack>
  )
}
