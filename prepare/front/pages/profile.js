import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowingList from "../components/FollowingList";
import FollowerList from "../components/FollowerList";
const Profile = () => {
  const followerList = [
    { nickname: "유저1" },
    { nickname: "유저2" },
    { nickname: "유저3" },
  ];
  const followingList = [
    { nickname: "유저4" },
    { nickname: "유저5" },
    { nickname: "유저6" },
  ];
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowingList header="팔로잉 목록" data={followerList} />
        <FollowerList header="팔로워 목록" data={followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;
