import { Dispatch } from 'redux'
import { NEWS_LOADING_TEASER_LIST, NEWS_SET_ACTIVE_NEWS, NEWS_SET_TEASER_NEWS, NewsDispatchTypes } from './NewsActionTypes'
import * as newsApi from '../../lib/api/news'



export const setActiveNews = ( newsId: number ) => ( dispatch: Dispatch<NewsDispatchTypes> ) => {
    dispatch( { type: NEWS_SET_ACTIVE_NEWS, payload: { newsId } } )
}
export const addNewsTeaser = () => async ( dispatch: Dispatch<NewsDispatchTypes> ) => {
}

export const loadNewsTeaser = () => async ( dispatch: Dispatch<NewsDispatchTypes> ) => {
    dispatch( { type: NEWS_LOADING_TEASER_LIST, payload: { loading: true } } )
    const { data: news } = await newsApi.get()
    console.log( 'News Teaser :', news )
    dispatch( { type: NEWS_SET_TEASER_NEWS, payload: { news } } )
    dispatch( { type: NEWS_LOADING_TEASER_LIST, payload: { loading: false } } )
}


