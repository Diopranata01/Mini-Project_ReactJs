import React from "react";
import { AuthStatus } from './Auth/AuthStatus'
import { Token } from "./Token";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserPosts, UnPosts, CreatePost, MainBlogPage, HomePage, AboutPage } from './Pages'
import { MainDeletedPage } from "./Pages/BlogPage/MainBlogPage/MainDeletedPage";
import { MainCreatedPage } from "./Pages/BlogPage/MainBlogPage/MainCreatedPage";

function App() {

  const shouldRedirect = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainBlogPage/>}></Route>
          <Route path="/home" element={<UserPosts/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/userinfo" element={<AuthStatus />}></Route>
          <Route path="/post" element={<MainBlogPage />}></Route>
            <Route path="/createdpost" element={<MainCreatedPage />}></Route>
            <Route path="/deletedpost" element={<MainDeletedPage />}></Route>
            <Route path="/mainpost" element={<MainBlogPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
