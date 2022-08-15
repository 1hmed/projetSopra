import React from "react";

import logo from "../img/logo.png";
import logo_dark from "../img/logo2.png";
import { Link, useNavigate } from "react-router-dom";
// prettier-ignore
import { Flex, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";
import { logout } from "../firebase-config";

const NavBar = ({ user, setsearchTerm, searchTerm }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("orange.400", "orange.400");
  async function handleLogout(){
    try{
      await logout();
      localStorage.clear();
      navigate("/login", { replace: true });

    }catch{
      alert("error !")
    }
  }
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      width={"100vw"}
      p={4}
    >
      <Link to={"/"}>
        <Image src={colorMode == "dark" ? logo_dark : logo} width={"250px"} />
      </Link>

      <InputGroup mx={6} width="60vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch fontSize={25} />}
        />
        <Input
          type="text"
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant={"filled"}
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          onFocus={() => navigate("/search")}
          
        />
      </InputGroup>

      <Flex justifyContent={"center"} alignItems="center">
        <Flex
          width={"40px"}
          height="40px"
          justifyContent={"center"}
          alignItems="center"
          cursor={"pointer"}
          borderRadius="5px"
          onClick={toggleColorMode}
        >
          {colorMode == "light" ? (
            <IoMoon fontSize={25} />
          ) : (
            <IoSunny fontSize={25} />
          )}
        </Flex>

        {/* crerate Btn */}
        <Link to={`/create`}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg={bg}
            width="40px"
            height="40px"
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={`${colorMode == "dark" ? "#111" : "#FFFFFF"}`}
            />
          </Flex>
        </Link>

        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL}
              width="40px"
              height="40px"
              minWidth={"40px"}
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
            <Link to={`/userDetail/${user?.uid}`}>
              <MenuItem>My Account ({user?.displayName})</MenuItem>
            </Link>
            <MenuItem
              flexDirection={"row"}
              alignItems="center"
              gap={4}
              onClick={handleLogout}
            >
              Logout <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
