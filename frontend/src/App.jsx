import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomeMain/home";
import CreateNewBlogPage from "./pages/CreateNreBlogPageMain/CreateNewBlogPage";
import Signup from "./pages/SignupMain/Signup";
import Login from "./pages/LoginMain/Login";
import UserProfile from "./pages/UserProfileMain/UserProfile";
import React from "react";
import "./App.css";
import EditBlog from "./pages/EditBlogMain/EditBlog";
import BlogDetail from "./pages/BlogDetailMain/BlogDetail";
import NavBar from "./Componets/NavBarMain/NavBar";
import PrivateRoute from "./Componets/PrivateRouteMain/PrivateRoute";




function App() {
  return (
    <div className="min-h-screen bg-[#090631]">

      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createNewBlogPage" element={
            <PrivateRoute>
              <CreateNewBlogPage/>
            </PrivateRoute>
          } />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserProfile" element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          } />
          <Route path="/EditBlog/:id" element={
            <PrivateRoute>
              <EditBlog/>
            </PrivateRoute>
          } />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
