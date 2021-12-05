import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

function Song({ userInfo }) {
  const { songID } = useParams();
  const username = userInfo.username;
  const [writeComment, setWriteComment] = useState();
  const [songTime, setSongTime] = useState();

  const [totalSongTime, setTotalSongTime] = useState();
  const [songComment, setSongComment] = useState([]);

  //youtube_song_detail.
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/youtubeDetail?songID=${songID}`)
      .then((response) => {
        setTotalSongTime(response.data.duration);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [songID]);

  //TODO: getComment, Display songComment of songID
  const URL = `${REACT_APP_API_URL}/getComment?songID=${songID}`;
  useEffect((songID) => {}, [songID]);

  const handleAddComment = (e) => {
    e.preventDefault();
    console.log(username, songID, writeComment, songTime);
    axios
      .post(`${REACT_APP_API_URL}/writeComment`, {
        username: username,
        songID: songID,
        timestamp: songTime,
        comments: writeComment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div className="songWrapper">
      <h1>Song</h1>
      <p>{songID}</p>
      <h2>Comments of current song</h2>
      {/* {songComment.map((aComment, i)=>{
        return(<p>)
      })} */}

      <form onSubmit={handleAddComment}>
        <label htmlFor="comment">Write your comment</label>
        <input
          type="text"
          name="comment"
          value={writeComment}
          onChange={(e) => {
            setWriteComment(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="songTime">
          Enter when(within the song, in second) you want to insert the comment
          {songTime}, totalSongTime{totalSongTime}
        </label>
        <input
          type="number"
          name="songTime"
          value={songTime}
          max={totalSongTime}
          onChange={(e) => {
            setSongTime(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Leave a comment</button>
      </form>
    </div>
  );
}

export default Song;
