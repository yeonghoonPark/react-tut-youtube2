import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

type Props = {
  video: any;
};

export default function VideoCard({ video }: Props) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();

  const goVideoDetail = (videoId: string) => {
    navigate(`/videos/watch/${videoId}`, { state: { video: video } });
  };

  return (
    <li onClick={() => goVideoDetail(video.id)}>
      <img className='w-full' src={thumbnails.medium.url} alt={title} />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{formatAgo(publishedAt, "ko")}</p>
      </div>
    </li>
  );
}
