
import { useFetchPost } from '~/composables/useRequest';


import type { FavoriteToggleParams } from '~/types/user';
import type { ArtworListParams,ArtworDetailParams,NewsListParams } from '~/types/index';


// 获取艺术品列表（SSR 首屏，setup 顶层调用）
export const getArtworkListApi = (params: ArtworListParams,isServer=false) =>
  useFetchPost('/v1/artwork/list', params,isServer)

// 获取艺术品详情
export const getArtworkDetailApi = (params: ArtworDetailParams) =>
  useFetchPost('/v1/artwork/detail', params,true)

// 关注
export const favoriteToggleApi = (params: FavoriteToggleParams) =>
  useDollarPost('/v1/interaction/favorite/toggle', params)
