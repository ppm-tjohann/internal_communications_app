import { NewsTeaser } from '../interfaces/news'
import { NewsDispatchTypes } from '../actions/news/NewsActionTypes'



interface DefaultState {
    newsTeaser: NewsTeaser[]
}

const defaultState: DefaultState = {
    newsTeaser: [],
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