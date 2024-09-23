import React, { useEffect, useState, useRef } from "react";
import Carousel from "./Carousel";
import GlobalPopup from "../../global/GlobalPopup";
import { FiMoreVertical } from "react-icons/fi";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaComment,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import fetchService from "../../services/fetchService";

export default function UserPost({
  postData,
  comments,
  onHandlePostImages,
  onDelete,
  onSelectPost,
}) {
  const [commentSectionVisible, setCommentSection] = useState(false);
  const [realTimeWrittenComments, setRealTimeWrittenComments] = useState();
  const [tabMenuVisible, setTabMenu] = useState(false);

  const commentInputValue = useRef("");
  const loggedUserID = localStorage.getItem("loggedUserID");
  const navigate = useNavigate();

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    postId: null,
  });

  const [userButtons, setUserButtons] = useState({
    liked: false,
    comment: false,
    saved: false,
  });

  useEffect(() => {
    if (postData && postData.likes) {
      const isLikedByUser = postData.likes.some(
        (like) => like.user_id === loggedUserID
      );

      if (isLikedByUser) {
        setUserButtons((prevState) => ({
          ...prevState,
          liked: true,
        }));
      }
    }
  }, [postData, loggedUserID]);

  function toggleUserButton(button) {
    if (button === "comment") {
      setCommentSection((prevState) => !prevState);
    }

    setUserButtons((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  }
  function toggleTabMenu() {
    setTabMenu((prevState) => !prevState);
  }

  function deletePostAlert(title, message, postId) {
    setPopupData((prevState) => ({
      ...prevState,
      title: title,
      message: message,
      postId: postId,
    }));
  }

  async function handleLikeEvent(postId) {
    toggleUserButton("liked");

    try {
      const response = await fetchService.post(
        `/social_media/posts/like/${postId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function postComment(postId, commentValue) {
    if (!commentValue.trim()) return;

    const loggedUserEmail = localStorage.getItem("loggedUserEmail");
    const loggedUsername = localStorage.getItem("loggedUsername");

    const body = {
      username: loggedUsername || loggedUserEmail,
      text: commentValue,
      postId: postId,
    };

    try {
      const response = await fetch(
        `https://react-social-18a7b-default-rtdb.europe-west1.firebasedatabase.app/comments.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      setRealTimeWrittenComments((prevState) => {
        return prevState ? [...prevState, body] : [body];
      });
      commentInputValue.current.value = "";
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  return (
    <>
      {popupData.title && (
        <GlobalPopup
          title={popupData.title}
          message={popupData.message}
          onEvent={() => {
            onDelete(popupData.postId);
            setPopupData({ title: "", message: "", postId: null });
          }}
          onClose={() =>
            setPopupData({ title: "", message: "", postId: null })
          }></GlobalPopup>
      )}
      <main className="flex items-center justify-center p-2">
        <div className="mainContent max-w-[468px] w-full bg-white rounded-xl shadow-main-shadow p-4 ">
          {/* User Info Section */}
          <div className="userContent relative flex justify-between items-center mb-4">
            <div className="leftSide flex items-center gap-3">
              <img
                src={postData.author.profile_picture}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer object-contain"
                onClick={() => navigate(`/singleUser/${postData.author.id}`)}
              />
              <h3
                onClick={() => navigate(`/singleUser/${postData.author.id}`)}
                className="font-semibold text-gray-800 cursor-pointer">
                {postData.author.username}
              </h3>
            </div>
            <div className="rightSide">
              <FiMoreVertical
                size={20}
                className="text-gray-600 cursor-pointer"
                onClick={() => toggleTabMenu()}
              />
            </div>
            {tabMenuVisible && (
              <div
                className="menuTab absolute right-0 top-10 z-10 bg-white p-2 shadow-standard-shadow rounded-lg"
                onClick={() => setTabMenu(false)}>
                <p
                  onClick={() => onHandlePostImages(postData.images)}
                  className="font-[600] p-1 text-textColors-100 hover:bg-purple-100 rounded-md cursor-pointer">
                  View Post
                </p>
                <p
                  onClick={() => navigate(`/singleUser/${postData.author.id}`)}
                  className="font-[600] p-1 text-textColors-100 hover:bg-purple-100 rounded-md cursor-pointer">
                  View User Profile
                </p>
                {loggedUserID === postData.author.id && (
                  <p
                    onClick={() => onSelectPost(postData)}
                    className="font-[600] p-1 text-textColors-100 hover:bg-purple-100 rounded-md cursor-pointer">
                    Update Post
                  </p>
                )}
                {loggedUserID === postData.author.id && (
                  <p
                    onClick={() =>
                      deletePostAlert(
                        "Are you sure you want to delete this post?",
                        "Selected post will be removed from your application!",
                        postData.id
                      )
                    }
                    className="font-[600] p-1 text-textColors-100 hover:bg-purple-100 rounded-md cursor-pointer">
                    Delete Post
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Carousel Section */}
          <div className="w-full h-full overflow-hidden rounded-lg shadow-md mb-4">
            <Carousel
              autoslide={false}
              postData={postData}>
              {postData.images.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt={`Slide ${index}`}
                  className="object-cover "
                />
              ))}
            </Carousel>
          </div>

          {/* Interaction Buttons */}
          <div className="postButtons flex justify-between items-center">
            <div className="flex gap-3">
              {userButtons.liked ? (
                <FaHeart
                  onClick={() => handleLikeEvent(postData.id)}
                  size={26}
                  className="cursor-pointer transition-all duration-300 text-red-500"
                />
              ) : (
                <FaRegHeart
                  onClick={() => handleLikeEvent(postData.id)}
                  size={26}
                  className="text-gray-600 cursor-pointer transition-all duration-300 hover:text-red-500"
                />
              )}

              {userButtons.comment ? (
                <FaComment
                  onClick={() => toggleUserButton("comment")}
                  size={26}
                  className="  cursor-pointer transition-all duration-300 text-blue-500"
                />
              ) : (
                <FaRegComment
                  onClick={() => toggleUserButton("comment")}
                  size={26}
                  className="hover:text-blue-500 text-gray-600 cursor-pointer transition-all duration-300 "
                />
              )}
            </div>
            <div>
              {userButtons.saved ? (
                <FaBookmark
                  onClick={() => toggleUserButton("saved")}
                  size={26}
                  className=" cursor-pointer transition-all duration-300 text-textColors-100"
                />
              ) : (
                <FaRegBookmark
                  onClick={() => toggleUserButton("saved")}
                  size={26}
                  className="hover:text-textColors-100 text-gray-600 cursor-pointer transition-all duration-300 "
                />
              )}
            </div>
          </div>

          {/* Post title */}
          <div className="mt-1 border-b py-2 border-gray-300">
            <h3 className="font-semibold text-gray-800">{postData.title}</h3>
            <p className="text-gray-600">{postData.description}</p>
          </div>

          {/* comment section */}
          <div
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
              commentSectionVisible ? "max-h-40 overflow-y-auto" : "max-h-0"
            }`}>
            {comments &&
              Object.values(comments)
                .filter((comment) => comment.postId === postData.id)
                .map((comment) => (
                  <div
                    key={comment.text}
                    className="flex gap-2 py-2">
                    <h4 className="font-semibold">{comment.username}:</h4>
                    <span className="text-gray-600">{comment.text}</span>
                  </div>
                ))}

            {realTimeWrittenComments &&
              realTimeWrittenComments
                .filter((comment) => comment.postId === postData.id)
                .map((comment) => (
                  <div
                    key={comment.text}
                    className="flex gap-2 py-2">
                    <h4 className="font-semibold">{comment.username}:</h4>
                    <span className="text-gray-600">{comment.text}</span>
                  </div>
                ))}

            {!comments && !realTimeWrittenComments && (
              <p className="py-2 text-gray-500">
                No comments added on this post!
              </p>
            )}
            <div className="flex items-center space-x-3 py-2">
              <input
                type="text"
                placeholder="Write your comment!"
                ref={commentInputValue}
                className="w-full border border-gray-300 rounded-lg p-2  "
              />
              <button
                onClick={() =>
                  postComment(postData.id, commentInputValue.current.value)
                }
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
                Post!
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
