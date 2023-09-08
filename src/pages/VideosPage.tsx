import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const getVideos = async (keyword: string | undefined): Promise<any> => {
  const url = keyword
    ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${keyword}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    : `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=28&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items;
  } catch (e) {
    return alert(e);
  }
};

export default function VideosPage() {
  const { keyword } = useParams();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    //
    ["videos", keyword],
    () => getVideos(keyword),
    { staleTime: 5 * 60 * 1000 },
  );

  return (
    <>
      VideosPage
      <div>{keyword ? keyword : "Hot Trend"}</div>
      {isLoading && <span>Loading..</span>}
      {error && <span>Something is wrong..</span>}
      <ul>
        {videos &&
          videos.map((video: any) => (
            <VideoCard key={video.etag} video={video} />
          ))}
      </ul>
    </>
  );
}
