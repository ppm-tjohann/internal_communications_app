import { useAppSelector } from '../Store'



const useCalendar = () => {
    const calendar = useAppSelector( state => state.calendar )

    return {
        ...calendar,
    }
}
export default useCalendar