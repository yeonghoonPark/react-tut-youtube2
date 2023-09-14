import axios from "axios";

const changeId = (items: any): any => {
  return items.map((item: any) => ({ ...item, id: item.id.videoId }));
};

export default class Youtube {
  httpClient: any;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  // public
  async getVideos(keyword: string | undefined): Promise<any> {
    return keyword
      ? this.#getVideosBySearchKeyword(keyword)
      : this.#getMostPopularVideos();
  }

  async getChannelThumbnailUrl(channelId: string | undefined): Promise<any> {
    // https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]
    try {
      const res = await this.httpClient.get("channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      const items = await res.data.items[0].snippet.thumbnails.default.url;
      return items;
    } catch (e) {
      console.error("AxiosError!! Something wrong....\n", e);
    }
  }

  async getRelatedVideos(title: string | undefined): Promise<any> {
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${videoTitle}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
    try {
      const res = await this.httpClient.get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: title,
        },
      });
      const items = await changeId(res.data.items);
      return items;
    } catch (e) {
      console.error("AxiosError!! Something wrong....\n", e);
    }
  }

  // privite
  async #getVideosBySearchKeyword(keyword: string | undefined): Promise<any> {
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${keyword}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
    try {
      const res = await this.httpClient.get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      });
      const items = await changeId(res.data.items);
      return items;
    } catch (e) {
      console.error("AxiosError!! Something wrong....\n", e);
    }
  }

  async #getMostPopularVideos(): Promise<any> {
    // https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=28&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
    try {
      const res = await this.httpClient.get("videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 25,
        },
      });
      const items = await res.data.items;
      return items;
    } catch (e) {
      console.error("AxiosError!! Something wrong....\n", e);
    }
  }
}
