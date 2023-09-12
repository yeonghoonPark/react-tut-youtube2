import axios from "axios";

export default class Youtube {
  httpClient: any;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  // javaScript에서 함수 앞에 #을 붙일 경우 privite함수이다, class내부적으로는 호출이 가능하나 class외부에서는 호출 할 수 없다.
  async getVideos(keyword: string | undefined): Promise<any> {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword: string | undefined): Promise<any> {
    // const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${keyword}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    try {
      const res = await this.httpClient.get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
        },
      });
      const items = await res.data.items;
      items.map((item: any) => ({ ...item, id: item.id.videoId }));
      return items;
    } catch (e) {
      console.error("AxiosError!! Something wrong....\n", e);
    }
  }

  async #mostPopular(): Promise<any> {
    // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=28&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
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
