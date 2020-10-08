import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

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
        <FollowList data={followerList} isfollower={false} />
        <FollowList data={followingList} isfollower={true} />
      </AppLayout>
    </>
  );
};

export default Profile;
