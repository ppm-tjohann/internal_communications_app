import SquareBox from '../../utils/SquareBox'
import Image from '../../utils/Image'



const PostImage = ( { addBaseUrl = false, src }: { src: string, addBaseUrl?: boolean } ) => {

    // TODO add real post image

    const {
        REACT_APP_SRC_BASE: SRC_BASE = 'http://localhost:8000',
    } = process.env

    if ( src.startsWith( '/' ) ) {
        addBaseUrl = true
    }

    const getSrc = () => addBaseUrl ? SRC_BASE + src : src

    return (
      <SquareBox>
          <Image src={getSrc()}/>
      </SquareBox>
    )
}
export default PostImage