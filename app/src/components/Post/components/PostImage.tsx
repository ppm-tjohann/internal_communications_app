import SquareBox from '../../utils/SquareBox'
import Image from '../../utils/Image'



interface PostImageProps {
    src: string
    addBaseUrl?: boolean
}

const PostImage = ( { addBaseUrl = true, src = 'https://picsum.photos/800/800' }: PostImageProps ) => {

    const {
        REACT_APP_SRC_BASE: SRC_BASE = 'http://localhost:8000',
    } = process.env

    const getSrc = () => addBaseUrl ? SRC_BASE + src : src

    return (
      <SquareBox>
          <Image src={getSrc()}/>
      </SquareBox>
    )
}
export default PostImage