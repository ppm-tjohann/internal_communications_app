import { AbcSharp } from '@mui/icons-material'
import SquareBox from '../../utils/SquareBox'
import { Skeleton } from '@mui/material'



interface PostImageProps {
    src: string
}

const PostImage = ( { src = 'https://picsum.photos/800/800' }: PostImageProps ) => {
    return (
      <SquareBox>
          <img src={src}/>
      </SquareBox>
    )
}
export default PostImage