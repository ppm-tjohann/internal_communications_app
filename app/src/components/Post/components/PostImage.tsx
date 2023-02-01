import SquareBox from '../../utils/SquareBox'
import Image from '../../utils/Image'



const PostImage = ( { addBaseUrl = false, src = 'https://picsum.photos/800/800' } ) => {

    // TODO add real post image

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