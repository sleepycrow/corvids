export type VideoThumbnail = {
  quality: string,
  url: string,
  width: number,
  height: number
}

export type AuthorThumbnail = {
  url: string,
  width: number,
  height: number
}

export type AuthorBanner = {
  url: string,
  width: number,
  height: number
}

export type VideoResultItem = {
  type: "video",
  title: string,
  videoId: string,
  author: string,
  authorId: string,
  authorUrl: string,
  videoThumbnails: Array<VideoThumbnail>,
  description: string,
  descriptionHtml: string,
  viewCount: number,
  published: number,
  publishedText: string,
  lengthSeconds: number,
  liveNow: boolean,
  paid: boolean,
  premium: boolean
}

export type PlaylistResultItem = {
  type: "playlist",
  title: string,
  playlistId: string,
  author: string,
  authorId: string,
  authorUrl: string,

  videoCount: number,
  videos: [
    {
      title: string,
      videoId: string,
      lengthSeconds: number,
      videoThumbnails: Array<VideoThumbnail>
    }
  ]
}

export type ChannelResultItem = {
  type: "channel",
  author: string,
  authorId: string,
  authorUrl: string,

  authorThumbnails: Array<AuthorThumbnail>,
  subCount: number,
  videoCount: number,
  description: string,
  descriptionHtml: string
}

export type ResultItem = VideoResultItem | PlaylistResultItem | ChannelResultItem

export type RecommendedVideoItem = {
  videoId: string,
  title: string,
  videoThumbnails: [
    {
      quality: string,
      url: string,
      width: number,
      height: number
    }
  ],
  author: string,
  lengthSeconds: number,
  viewCountText: string
}

export type VideoInformation = {
  title: string,
  videoId: string,
  videoThumbnails: Array<VideoThumbnail>,

  description: string,
  descriptionHtml: string,
  published: number,
  publishedText: string,

  keywords: Array<string>,
  viewCount: number,
  likeCount: number,
  dislikeCount: number,

  paid: boolean,
  premium: boolean,
  isFamilyFriendly: boolean,
  allowedRegions: Array<string>,
  genre: string,
  genreUrl: string,

  author: string,
  authorId: string,
  authorUrl: string,
  authorThumbnails: Array<AuthorThumbnail>,

  subCountText: string,
  lengthSeconds: number,
  allowRatings: boolean,
  rating: number,
  isListed: boolean,
  liveNow: boolean,
  isUpcoming: boolean,
  premiereTimestamp?: number,

  hlsUrl?: string,
  dashUrl?: string,
  adaptiveFormats: [
    {
      index: string,
      bitrate: string,
      init: string,
      url: string,
      itag: string,
      type: string,
      clen: string,
      lmt: string,
      projectionType: number,
      container: string,
      encoding: string,
      qualityLabel?: string,
      resolution?: string
    }
  ],
  formatStreams: [
    {
      url: string,
      itag: string,
      type: string,
      quality: string,
      container: string,
      encoding: string,
      qualityLabel: string,
      resolution: string,
      size: string
    }
  ],
  captions: [
    {
      label: string,
      languageCode: string,
      url: string
    }
  ],
  recommendedVideos: Array<RecommendedVideoItem>
}

export type ChannelInformation = {
  "author": string,
  "authorId": string,
  "authorUrl": string,
  "authorBanners": Array<AuthorBanner>,
  "authorThumbnails": Array<AuthorThumbnail>,

  "subCount": number,
  "totalViews": number,
  "joined": number,

  "paid": boolean,
  "autoGenerated": boolean,
  "isFamilyFriendly": boolean,
  "description": string,
  "descriptionHtml": string,
  "allowedRegions": Array<string>,

  "latestVideos": [
    {
      "title": string,
      "videoId": string,
      "author": string,
      "authorId": string,
      "authorUrl": string,

      "videoThumbnails": Array<VideoThumbnail>,
      "description": string,
      "descriptionHtml": string,
      "viewCount": number | null,
      "published": number,
      "publishedText": string,
      "lengthSeconds": number,
      "paid": boolean,
      "premium": boolean
    }
  ],
  "relatedChannels": [
    {
      "author": string,
      "authorId": string,
      "authorUrl": string,
      "authorThumbnails": Array<AuthorThumbnail>
    }
  ]
}