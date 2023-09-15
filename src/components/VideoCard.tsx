import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

type VideoType = "list" | "none";

type Props = {
  video: any;
  type?: VideoType;
};

export default function VideoCard({ video, type = "none" }: Props) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();

  const goVideoDetail = (videoId: string) => {
    navigate(`/videos/watch/${videoId}`, { state: { video: video } });
  };

  const isList = type === "list";

  return (
    <li
      className={isList ? "flex gap-1 m-2" : ""}
      onClick={() => goVideoDetail(video.id)}
    >
      <img
        className={isList ? "w-60 mr-2" : "w-full"}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{formatAgo(publishedAt, "ko")}</p>
      </div>
    </li>
  );
}
