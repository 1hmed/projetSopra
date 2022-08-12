import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { firebaseApp, login, useAuth } from "../../../firebase-config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsonEval } from "@firebase/util";
import { useEffect } from "react";
import {doc,getFirestore, setDoc} from "firebase/firestore";


export function LoginForm(props) {
  const firebaseDb= getFirestore(firebaseApp);
  const { switchToSignup } = useContext(AccountContext);
  const [loading, setLoading]=useState(false);
  const emailRef=useRef();
  const passwordRef= useRef();
  const currentUser = useAuth ();
  const navigate=useNavigate();
  // console.log(currentUser);
  const handleLogin= async ()=>{
    setLoading(true) ; 
    try{
    const {user}=await login(emailRef.current.value, passwordRef.current.value);
    const {refreshToken,providerData}= user;
    localStorage.setItem("user",JSON.stringify(providerData));
    localStorage.setItem("accessToken",JSON.stringify(refreshToken));
    await setDoc(doc(firebaseDb, 'users',providerData[0].uid), providerData[0]
    );
    navigate('/',{replace: true})
  } catch {
    alert ("Error!");
  }
  setLoading(false);
}

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" ref={emailRef} placeholder="Email" />
        <Input type="password" ref={passwordRef}  placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton  onClick={handleLogin} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
