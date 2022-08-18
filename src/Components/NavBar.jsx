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
              src="data:image/png;base64,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"
              width="40px"
              height="40px"
              minWidth={"40px"}
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
            <Link to={`/userDetail/${user?.uid}`}>
              <MenuItem>{user?.displayName}</MenuItem>
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
