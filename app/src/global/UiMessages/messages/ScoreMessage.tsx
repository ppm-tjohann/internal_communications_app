import MessageWrapper from './MessageWrapper'



const ScoreMessage = ( { score }: { score: number } ) => {

    return (
      <MessageWrapper description={'Your score has updated'}>{`New Score: ${score}`}</MessageWrapper>
    )
}
export default ScoreMessage
