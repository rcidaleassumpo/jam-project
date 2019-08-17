import React, { useState } from "react";

import ErrorDialog from "./ErrorDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { likeSong } from "./services/songs-service";
import { LIKE_URL } from "./utils/constants";

export function MusicContainer({ song }) {
  const formData = new FormData();
  const {
    cover_image_path,
    artist_name,
    comments,
    likes,
    name,
    id,
    music_file_path
  } = song;
  formData.append("id", id);
  const [innerLikes, updateLikes] = useState(likes);
  const [innerComments, updateComments] = useState(comments);
  const [errorMessage, updateErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <div className="music-container">
      <ErrorDialog
        errorMessage={errorMessage}
        open={open}
        handleClose={handleCloseDialog}
      />
      <div className="cover-container">
        <img src={cover_image_path || ""} alt="cover" height={"50px"} />
      </div>
      <div className="play-pause-container flex-default">
        <audio controls>
          <source src={music_file_path} />
        </audio>
      </div>
      <div className="song-info-container flex-default">
        <span className="song-info-container--content">{name}</span>
      </div>
      <div className="song-info-container flex-default">
        <span className="song-info-container--content">{artist_name}</span>
      </div>
      <div className="comment-container flex-default">
        <FontAwesomeIcon
          icon={faComment}
          size={"lg"}
          color={"white"}
          className="font-awesome--comment"
          onClick={() => {
            likeSong(
              LIKE_URL,
              formData,
              () => updateComments(innerComments + 1),
              () => {
                updateErrorMessage("We were unable to add the comment..");
                handleClickOpen();
              }
            );
          }}
        />
        <span>{innerComments}</span>
      </div>
      <div className="like-container flex-default">
        <FontAwesomeIcon
          icon={faThumbsUp}
          size={"lg"}
          color={"white"}
          className="font-awesome--thumbsup"
          onClick={() => {
            likeSong(
              LIKE_URL,
              formData,
              () => updateLikes(innerLikes + 1),
              () => {
                updateErrorMessage("We were unable to add the like..");
                handleClickOpen();
              }
            );
          }}
        />
        <span>{innerLikes}</span>
      </div>
    </div>
  );
}
