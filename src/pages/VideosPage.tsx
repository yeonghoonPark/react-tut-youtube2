import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeContextApi";

export default function VideosPage() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ["videos", keyword], //
    () => youtube.getVideos(keyword),
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
