import React, { useEffect, useState } from "react";
import { signup ,useAuth } from "../firebase-config";
import { Flex } from "@chakra-ui/react";
import {
  Category,
  Create,
  Feed,
  NavBar,
  Search,
  UserProfile,
  VideoPinDetail,
} from "../Components";
import { Routes, Route } from "react-router-dom";
import { categories } from "../data";
const Home = ({ user }) => {
  console.log(user);
  const [searchTerm, setsearchTerm] = useState("");
  window.onload = function() {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }
  window.onload();
  console.log(user);
  return (
    <>
      <NavBar user={user} setsearchTerm={setsearchTerm} />

      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width="5%"
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"}
          px={4}
          justifyContent="center"
          alignItems={"center"}
          px={4}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route
              path="/search"
              element={<Search searchTerm={searchTerm} />}
            />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
