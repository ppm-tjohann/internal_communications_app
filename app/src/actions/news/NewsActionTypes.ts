import { NewsTeaser } from '../../interfaces/news'



export const NEWS_SET_ACTIVE_NEWS = 'NEWS_SET_ACTIVE_NEWS'
export const NEWS_SET_TEASER_NEWS = 'NEWS_SET_TEASER_NEWS'
export const NEWS_ADD_TEASER_NEWS = 'NEWS_ADD_TEASER_NEWS'
export const NEWS_LOADING_TEASER_LIST = 'NEWS_LOADING_TEASER_LIST'

export interface NewsSetActiveNews {
    type: typeof NEWS_SET_ACTIVE_NEWS,
    payload: { newsId: number }
}

export interface NewsSetTeaserNews {
    type: typeof NEWS_SET_TEASER_NEWS
    payload: { news: NewsTeaser[] }
}

export interface NewsAddTeaserNews {
    type: typeof NEWS_ADD_TEASER_NEWS,
    payload: { news: NewsTeaser }
}

export interface NewsLoadingTeaserList {
    type: typeof NEWS_LOADING_TEASER_LIST,
    payload: { loading: boolean }
}

export type NewsDispatchTypes =
  | NewsSetActiveNews
  | NewsSetTeaserNews
  | NewsAddTeaserNews
  | NewsLoadingTeaserList

