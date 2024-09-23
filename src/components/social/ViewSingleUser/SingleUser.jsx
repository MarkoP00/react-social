import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService.js";
import PostImagesInspect from "../../inspect/PostImagesInspect.jsx";
import UpdateProfile from "../../update/UpdateProfile.jsx";
import GlobalLoader from "../../../global/GlobalLoader.jsx";
import { useNavigate } from "react-router-dom";

export default function SingleUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [inspectPostImages, setInspectPostImages] = useState();
  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const [followingUser, setFollowingUser] = useState(false);
  const loggedUserID = localStorage.getItem("loggedUserID");
  const navigate = useNavigate();

  function handleInspectedImages(images) {
    setInspectPostImages(images);
  }

  function handleUpdateProfile() {
    setUpdateProfileOpen((prevState) => !prevState);
  }

  async function toggleFollowing(userId) {
    try {
      const response = await fetchService.post(
        `/social_media/users/follow/${userId}`
      );
      if (response) {
        setFollowingUser((prevState) => !prevState);
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUserID");
      localStorage.removeItem("loggedUserEmail");
      localStorage.removeItem("loggedUserProfilePicture");
      localStorage.removeItem("loggedUsername");
      navigate("/login");
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetchService.get(`/social_media/users/${id}`);
        if (response) {
          setUserData(response.data.user);
          console.log(response.data.user);

          const isFollowing = response.data.user.followers.some(
            (follower) => follower.id === loggedUserID
          );
          setFollowingUser(isFollowing);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingUser(false);
      }
    }
    getUserData();
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await fetchService.get(
          "/social_media/posts?combined=true"
        );
        if (responseData) {
          const filterPost = responseData.data.posts.filter(
            (post) => post.author.id === id
          );
          setUserPost(filterPost);
          console.log(responseData.data.posts);
          setIsLoadingPost(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getUsers();
  }, [id]);

  return (
    <>
      {isLoadingUser && <GlobalLoader></GlobalLoader>}
      {updateProfileOpen && (
        <UpdateProfile
          userData={userData}
          span="Warning"
          text="Select an image to upload both your profile picture and username. If you only want to update your username, click 'Change Username Only'. To change just your profile picture, simply select an image"
          onClose={handleUpdateProfile}></UpdateProfile>
      )}

      <main className="min-h-full w-full flex  justify-center items-center z-10 py-2">
        <div className="rounded-lg shadow-lg w-full max-w-2xl ">
          <div className="flex flex-col items-center gap-20 ">
            {userData && (
              <div className="userInfo flex flex-col gap-4 items-center">
                <img
                  src={userData.profile_picture}
                  alt="User Profile"
                  className="h-32 w-32 rounded-full object-cover border-2 border-purple-400"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-semibold">
                    {userData.username}
                  </h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
                <div className="flex gap-6 justify-center border-t border-b border-gray-300 py-2">
                  <p className="text-gray-700">
                    Posts <span className="font-bold">{userPost.length}</span>
                  </p>
                  <p className="text-gray-700">
                    Followers{" "}
                    <span className="font-bold">
                      {userData.followers.length}
                    </span>{" "}
                  </p>
                  <p className="text-gray-700">
                    Following{" "}
                    <span className="font-bold">
                      {userData.following.length}
                    </span>{" "}
                  </p>
                </div>
                <div className="flex gap-4 ">
                  {loggedUserID === id && (
                    <button
                      onClick={handleUpdateProfile}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition">
                      Edit profile
                    </button>
                  )}

                  {!followingUser && loggedUserID !== id && (
                    <button
                      onClick={() => toggleFollowing(userData._id)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition">
                      Follow
                    </button>
                  )}

                  {followingUser && loggedUserID !== id && (
                    <button
                      onClick={() => toggleFollowing(userData._id)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition">
                      Unfollow
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                    onClick={() => navigate("/mainPage")}>
                    Go Back
                  </button>
                </div>
              </div>
            )}

            <div className="images flex justify-center gap-4 items-center max-msm:flex-col">
              {userPost.length > 0 ? (
                userPost.map((element) => (
                  <div
                    className="w-96 h-[400px] cursor-pointer max-tsm:w-80 max-tsm:h-[300px] max-msm:w-24 "
                    key={element.id}>
                    <img
                      src={element.images[0]}
                      alt="User post image"
                      onClick={() => handleInspectedImages(element.images)}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                ))
              ) : (
                <p>No images available.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {inspectPostImages && (
        <PostImagesInspect
          images={inspectPostImages}
          closeEvent={handleInspectedImages}></PostImagesInspect>
      )}
    </>
  );
}
