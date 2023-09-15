import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeContextApi";
import VideoCard from "../components/VideoCard";

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
    { staleTime: 1000 * 60 * 3 },
  );

  return (
    <>
      {isLoading && <span>Loading..</span>}
      {error && <span>Something is wrong..</span>}
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
        {videos &&
          videos.map((video: any) => (
            <VideoCard key={video.etag} video={video} />
          ))}
      </ul>
    </>
  );
}
