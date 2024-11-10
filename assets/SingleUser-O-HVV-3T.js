import{r as n,j as e,S,W as k,b as _,f,c as C,u as E,a as F}from"./index-D8JXsdS7.js";import{I as L}from"./PostImagesInspect-ikFY5NCn.js";function W({userData:s,span:a,text:h,onClose:c}){const i=n.useRef(),[j,y]=n.useState(s.profile_picture);function N(r){i.current=r}async function g(r){const l=await f.patch("/social_media/users",r);l.ok&&console.log(l)}const u=window.cloudinary.createUploadWidget({cloud_name:"djre34b8c",upload_preset:"react-social",api_key:"612221761856468"},(r,l)=>{if(!r&&l&&l.event==="success"){const d=l.info.secure_url;y(d),localStorage.setItem("loggedUserProfilePicture",d);const p={profile_picture:l.info.secure_url,username:i.current?i.current:s.username};g(p)}});function b(){u.open()}return e.jsx(S,{onClose:c,children:e.jsxs("form",{onClick:r=>r.stopPropagation(),className:"space-y-6 relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full shadow-main-shadow max-ssm:space-y-2",children:[e.jsx("div",{className:"flex justify-center py-4",children:e.jsx("h3",{className:"text-3xl font-bold text-gray-900",children:"Update Profile"})}),e.jsx("div",{className:"userProfileImage flex justify-center",children:e.jsx("img",{src:j||"https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png",alt:"User Profile",className:"h-32 w-32 rounded-full object-cover shadow-lg border-4 border-indigo-500"})}),e.jsx("div",{className:"userNamePreview text-center mb-4",children:i.current?e.jsx("h3",{className:"text-2xl font-semibold text-gray-800",children:i.current}):e.jsx("h3",{className:"text-2xl font-semibold text-gray-800",children:s.username})}),e.jsx(k,{span:a,text:h}),e.jsxs("div",{className:"input flex flex-col space-y-4 mb-6",children:[e.jsx("label",{htmlFor:"username",className:"text-gray-700 font-medium",children:"New Username"}),e.jsx("input",{type:"text",id:"username",placeholder:"Leave empty to keep the current / Enter new one ",className:"px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",defaultValue:s.username,onChange:r=>N(r.target.value),autoComplete:"off",maxLength:"20",required:!0})]}),e.jsxs("div",{className:"flex justify-between gap-4 mb-6",children:[e.jsx("button",{type:"button",className:"px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md cursor-pointer max-msm:px-2 max-msm:py-2",onClick:()=>g({username:i.current,profile_picture:s.profile_picture}),children:"Change Username Only"}),e.jsx("button",{type:"button",onClick:b,className:"px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md max-msm:px-2 max-msm:py-2",children:"Change Photo"})]}),e.jsx("div",{onClick:()=>c(),className:`absolute right-6 top-2 text-indigo-600 hover:bg-indigo-300 duration-200 font-semibold cursor-pointer bg-indigo-200 p-2 rounded-lg
          max-msm:right-3 max-msm:top-0`,children:e.jsx(_,{size:20})})]})})}function z(){const{id:s}=C(),[a,h]=n.useState(null),[c,i]=n.useState([]),[j,y]=n.useState(!0),[N,g]=n.useState(!0),[u,b]=n.useState(),[r,l]=n.useState(!1),[d,p]=n.useState(!1),x=localStorage.getItem("loggedUserID"),v=E();function U(o){b(o)}function P(){l(o=>!o)}async function I(o){try{await f.post(`/social_media/users/follow/${o}`)&&p(m=>!m)}catch(t){localStorage.removeItem("token"),localStorage.removeItem("loggedUserID"),localStorage.removeItem("loggedUserEmail"),localStorage.removeItem("loggedUserProfilePicture"),localStorage.removeItem("loggedUsername"),v("/login"),console.error(t)}}return n.useEffect(()=>{async function o(){try{const t=await f.get(`/social_media/users/${s}`);if(t){h(t.data.user);const m=t.data.user.followers.some(w=>w.id===x);p(m)}}catch(t){console.error(t)}finally{y(!1)}}o()},[s]),n.useEffect(()=>{(async()=>{try{const t=await f.get("/social_media/posts?combined=true");if(t){const m=t.data.posts.filter(w=>w.author.id===s);i(m),g(!1)}}catch(t){console.error("Error fetching posts:",t)}})()},[s]),e.jsxs(e.Fragment,{children:[j&&e.jsx(F,{}),r&&e.jsx(W,{userData:a,span:"Warning",text:"Select an image to upload both your profile picture and username. If you only want to update your username, click 'Change Username Only'. To change just your profile picture, simply select an image",onClose:P}),e.jsx("main",{className:"min-h-full w-full flex  justify-center items-center z-10 py-2",children:e.jsx("div",{className:"rounded-lg shadow-lg w-full max-w-2xl ",children:e.jsxs("div",{className:"flex flex-col items-center gap-20 ",children:[a&&e.jsxs("div",{className:"userInfo flex flex-col gap-4 items-center",children:[e.jsx("img",{src:a.profile_picture,alt:"User Profile",className:"h-32 w-32 rounded-full object-cover border-2 border-purple-400"}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-2xl font-semibold",children:a.username}),e.jsx("p",{className:"text-gray-600",children:a.email})]}),e.jsxs("div",{className:"flex gap-6 justify-center border-t border-b border-gray-300 py-2",children:[e.jsxs("p",{className:"text-gray-700",children:["Posts ",e.jsx("span",{className:"font-bold",children:c.length})]}),e.jsxs("p",{className:"text-gray-700",children:["Followers"," ",e.jsx("span",{className:"font-bold",children:a.followers.length})," "]}),e.jsxs("p",{className:"text-gray-700",children:["Following"," ",e.jsx("span",{className:"font-bold",children:a.following.length})," "]})]}),e.jsxs("div",{className:"flex gap-4 ",children:[x===s&&e.jsx("button",{onClick:P,className:"px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition",children:"Edit profile"}),!d&&x!==s&&e.jsx("button",{onClick:()=>I(a._id),className:"px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition",children:"Follow"}),d&&x!==s&&e.jsx("button",{onClick:()=>I(a._id),className:"px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition",children:"Unfollow"}),e.jsx("button",{className:"px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition",onClick:()=>v("/mainPage"),children:"Go Back"})]})]}),e.jsx("div",{className:"images flex justify-center gap-4 items-center max-msm:flex-col",children:c.length>0?c.map(o=>e.jsx("div",{className:"w-96 h-[400px] cursor-pointer max-tsm:w-80 max-tsm:h-[300px] max-msm:w-24 ",children:e.jsx("img",{src:o.images[0],alt:"User post image",onClick:()=>U(o.images),className:"h-full w-full rounded-xl object-cover"})},o.id)):e.jsx("p",{children:"No images available."})})]})})}),u&&e.jsx(L,{images:u,closeEvent:U})]})}export{z as default};
