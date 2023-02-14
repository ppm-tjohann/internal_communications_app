import { NewsTeaser } from '../interfaces/news'
import { NewsDispatchTypes } from '../actions/news/NewsActionTypes'



interface DefaultState {
    activeNews: number | null
    newsTeaser: NewsTeaser[]
    test: NewsTeaser[]
}

const defaultState: DefaultState = {
    activeNews: null,
    newsTeaser: [],
    test: [],
}

const NewsReducer = ( state = defaultState, action: NewsDispatchTypes ) => {
    switch ( action.type ) {
        case 'NEWS_SET_ACTIVE_NEWS':
            return { ...state, activeNews: action.payload.newsId }
        case 'NEWS_SET_TEASER_NEWS':
            return { ...state, newsTeaser: action.payload.news }
        default:
            return state
    }
}
export default NewsReducer