import React, { useState, useEffect } from "react";
import UserPost from "../components/social/UserPost";
import fetchService from "../services/fetchService";
import PostImagesInspect from "../components/inspect/PostImagesInspect";
import UpdatePost from "../components/update/UpdatePost";
import GlobalPopup from "../global/GlobalPopup";
import GlobalLoader from "../global/GlobalLoader";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [postData, setPostData] = useState([]);
  const [commentPostData, setCommentPostData] = useState(null);
  const [inspectPostImages, setInspectPostPictures] = useState(null);
  const [selectedPostToUpdate, setSelectedPostToUpdate] = useState(null);
  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
  });

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const navigate = useNavigate();
  const handlePostImages = (postImages) => {
    setInspectPostPictures(postImages);
  };

  const selectPostToUpdate = (postData) => {
    setSelectedPostToUpdate(postData);
  };

  useEffect(() => {
    const getUsers = async () => {
      setIsLoadingPosts(true);
      try {
        const responseData = await fetchService.get(
          "/social_media/posts?combined=true"
        );
        if (responseData) {
          setPostData(responseData.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    async function getComments() {
      setIsLoadingComments(true);
      try {
        const response = await fetch(
          "https://react-social-18a7b-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
        );

        if (response.ok) {
          const responseData = await response.json();
          setCommentPostData(responseData);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoadingComments(false);
      }
    }
    getComments();
  }, []);

  useEffect(() => {
    async function authFunction() {
      try {
        const response = await fetchService.post(
          `/social_media/users/follow/66f0786853f6449f515f52a3`
        );
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUserID");
        localStorage.removeItem("loggedUserEmail");
        localStorage.removeItem("loggedUserProfilePicture");
        localStorage.removeItem("loggedUsername");
        navigate("/login");
      }
    }
    authFunction();
  }, []);

  async function deletePost(postId) {
    try {
      const response = await fetchService.delete(
        `/social_media/posts/${postId}`
      );

      if (response) {
        setPostData((prevState) =>
          prevState.filter((post) => post.id !== postId)
        );
      }
    } catch (error) {
      setPopupData({
        title: "Something went wrong...",
        message:
          "There was an issue deleting the post. Please try again later.",
      });
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center gap-10 py-10">
        {isLoadingPosts ? (
          <GlobalLoader></GlobalLoader>
        ) : (
          postData &&
          postData.slice(0, 7).map((post) => (
            <UserPost
              key={post.id}
              postData={post}
              onHandlePostImages={handlePostImages}
              onDelete={deletePost}
              onSelectPost={selectPostToUpdate}
              comments={commentPostData}
            />
          ))
        )}
      </div>

      {inspectPostImages && (
        <PostImagesInspect
          images={inspectPostImages}
          closeEvent={handlePostImages}
        />
      )}

      {selectedPostToUpdate && (
        <UpdatePost
          postData={selectedPostToUpdate}
          onClose={selectPostToUpdate}
          comments={commentPostData}
        />
      )}

      {popupData.title && (
        <GlobalPopup
          title={popupData.title}
          message={popupData.message}
          defaultPopup={true}
          onClose={() => setPopupData({ title: "", message: "" })}
        />
      )}
    </>
  );
}
