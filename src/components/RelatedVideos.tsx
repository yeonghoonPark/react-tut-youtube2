import React from "react";
import { useQuery } from "react-query";
import { useYoutubeApi } from "../context/YoutubeContextApi";
import VideoCard from "./VideoCard";

type Props = {
  title: string;
};

export default function RelatedVkeywordeos({ title }: Props) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: relatedVideos,
  } = useQuery(
    ["related", title], //
    () => youtube.getRelatedVideos(title),
    { staleTime: 5 * 60 * 1000 },
  );

  return (
    <>
      {isLoading && <span>Loading..</span>}
      {error && <span>Something is wrong..</span>}
      <ul>
        {relatedVideos &&
          relatedVideos.map((video: any) => (
            <VideoCard key={video.etag} video={video} />
          ))}
      </ul>
    </>
  );
}
