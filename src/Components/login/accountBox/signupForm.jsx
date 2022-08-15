import React, { useContext } from "react";
import "./design.css";
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
import { signup ,useAuth,adding } from "../../../firebase-config";
import { useRef, useState } from "react";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [loading, setLoading]=useState(false);
  const currentUser = useAuth ();
  const nameRef=useRef();
  const photoRef=useRef();
  const emailRef=useRef();
  const passwordRef= useRef();
  async function handleSignup(){
    setLoading(true) ; 
    try{
    await signup(emailRef.current.value, passwordRef.current.value);
    adding(nameRef.current.value,photoRef.current.value);
    switchToSignin();
  } catch {
    alert ("Error!");
  }
  setLoading(false);
}

  return (
    <BoxContainer>
      <div> Currently logged in as :{ currentUser?.email}</div>
      <FormContainer>
        <Input type="text" ref={nameRef} placeholder="Full Name" />
        <Input type="email" ref={emailRef} placeholder="Email" />
        <Input type="password" ref={passwordRef} placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <input type="file" ref={photoRef} id="file" accept="image/*" />
        <label for="file">
        <span class="material-icons"></span>
          Choose a Photo</label>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton disabled={loading || currentUser} onClick={handleSignup } type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
