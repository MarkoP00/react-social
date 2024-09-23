import{r as l,v as U,j as e,a as w,S as C,W as E,F as y,b as N,f as h,u as D,U as T,G as k}from"./index-SYPb0YSh.js";import{I as L}from"./PostImagesInspect-i859yGV4.js";function M({postData:n,onClose:d}){const[a,r]=l.useState({title:{value:n.title,invalid:!1,message:""},description:{value:n.description,invalid:!1,message:""}}),[p,c]=l.useState(!1),{formIsInvalid:f,updatedFormData:v}=U(a),m=t=>{r(s=>({...s,[t]:{...s[t],invalid:!1,message:""}}))},u=(t,s)=>{r(g=>({...g,[s]:{...g[s],value:t}}))};async function b(){if(r(v),c(!0),f){c(!1);return}if(n.title===a.title.value&&n.description===a.description.value){c(!1),r(s=>({...s,title:{...s.title,message:"Make changes to submit!"},description:{...s.description,message:"Make changes to submit!"}}));return}const t={title:a.title.value,description:a.description.value,images:n.images};try{const s=await h.patch(`/social_media/posts/${n.id}`,t)}catch(s){console.log(s)}finally{c(!1)}}return e.jsxs(e.Fragment,{children:[p&&e.jsx(w,{}),e.jsx(C,{onClose:()=>d(null),children:e.jsxs("form",{onClick:t=>t.stopPropagation(),action:"",className:"space-y-6 relative bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full shadow-main-shadow max-msm:space-y-2 max-msm:p-4",children:[e.jsx("div",{className:"text-center",children:e.jsx("h3",{className:"text-3xl font-semibold text-gray-800 max-ssm:text-xl",children:"Update Post"})}),e.jsx("div",{className:"flex flex-wrap gap-4 justify-center max-ssm:gap-1",children:n.images&&n.images.length>0?n.images.map((t,s)=>e.jsx("img",{src:t,alt:`User Post Image number ${s}`,className:"w-48 h-48 object-cover rounded-lg shadow-md"},t)):e.jsx("p",{children:"No images available"})}),e.jsx(E,{span:"Warning",text:"Please change fields which you want to be updated"}),e.jsx(y,{labelText:"Current Post Title",inputType:"text",inputFor:"title",inputValue:a.title.value,invalid:a.title.invalid,invalidMessage:a.title.message,onReset:()=>m("title"),onEvent:t=>u(t,"title")}),e.jsx(y,{labelText:"Current Post Description",inputType:"text",inputFor:"description",inputValue:a.description.value,invalid:a.description.invalid,invalidMessage:a.description.message,onReset:()=>m("description"),onEvent:t=>u(t,"description")}),e.jsx("div",{className:"text-center",children:e.jsx("button",{onClick:b,type:"button",className:"px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg w-full max-ssm:px-2 max-ssm:py-2",children:"Submit"})}),e.jsx("div",{onClick:()=>d(null),className:"absolute right-2 top-0 text-indigo-600 hover:bg-indigo-300 duration-200 font-semibold cursor-pointer bg-indigo-200 p-2 rounded-lg",children:e.jsx(N,{size:20})})]})})]})}function G(){const[n,d]=l.useState([]),[a,r]=l.useState(null),[p,c]=l.useState(null),[f,v]=l.useState(null),[m,u]=l.useState({title:"",message:""}),[b,t]=l.useState(!0),[s,g]=l.useState(!0),I=D(),P=o=>{c(o)},j=o=>{v(o)};l.useEffect(()=>{(async()=>{t(!0);try{const i=await h.get("/social_media/posts?combined=true");i&&d(i.data.posts)}catch(i){console.error("Error fetching posts:",i)}finally{t(!1)}})()},[]),l.useEffect(()=>{async function o(){g(!0);try{const i=await fetch("https://react-social-18a7b-default-rtdb.europe-west1.firebasedatabase.app/comments.json");if(i.ok){const x=await i.json();r(x),console.log(x)}}catch(i){console.error("Error fetching comments:",i)}finally{g(!1)}}o()},[]),l.useEffect(()=>{async function o(){try{const i=await h.post("/social_media/users/follow/66f0786853f6449f515f52a3")}catch{localStorage.removeItem("token"),localStorage.removeItem("loggedUserID"),localStorage.removeItem("loggedUserEmail"),localStorage.removeItem("loggedUserProfilePicture"),localStorage.removeItem("loggedUsername"),I("/login")}}o()},[]);async function S(o){try{await h.delete(`/social_media/posts/${o}`)&&d(x=>x.filter(F=>F.id!==o))}catch{u({title:"Something went wrong...",message:"There was an issue deleting the post. Please try again later."})}}return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"min-h-screen flex flex-col justify-center items-center gap-10 py-10",children:b?e.jsx(w,{}):n&&n.slice(0,7).map(o=>e.jsx(T,{postData:o,onHandlePostImages:P,onDelete:S,onSelectPost:j,comments:a},o.id))}),p&&e.jsx(L,{images:p,closeEvent:P}),f&&e.jsx(M,{postData:f,onClose:j,comments:a}),m.title&&e.jsx(k,{title:m.title,message:m.message,defaultPopup:!0,onClose:()=>u({title:"",message:""})})]})}export{G as default};