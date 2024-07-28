"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={profileName + "'s"}
      desc={"Welcome to " + profileName + "'s profile page"}
      data={posts}
    />
  );
};

export default UserProfile;
