import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import { PostFeed } from "../components/post-feed/PostFeed";
import Profile from "../components/Profile/profile";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Register from "../components/register/Register";
import AllUsers from "../components/users/AllUsers";

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<PostFeed />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/update" element={<UpdateProfile />} />
    <Route path="/users" element={<AllUsers />} />
  </Routes>
);
