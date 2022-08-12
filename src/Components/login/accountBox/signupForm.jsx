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
import { signup ,useAuth } from "../../../firebase-config";
import { useRef, useState } from "react";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [loading, setLoading]=useState(false);
  const currentUser = useAuth ();
  const emailRef=useRef();
  const passwordRef= useRef();
  async function handleSignup(){
    setLoading(true) ; 
    try{
    await signup(emailRef.current.value, passwordRef.current.value);
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
        <Input type="text" placeholder="Full Name" />
        <Input type="email" ref={emailRef} placeholder="Email" />
        <Input type="password" ref={passwordRef} placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
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
