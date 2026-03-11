import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserSignIn } from "../Api";
import { login } from '../redux/reducers/userSlice';

const Title = styled.div`font-size:30px; font-weight:800; color:${({ theme }) => theme.text_primary};`;
const Container = styled.div`width:100%; max-width:500px; display:flex; flex-direction:column; gap:34px;`;

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInput = () => !!email && !!password;

  const handleSignIn = async () => {
    if (!validateInput()) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await UserSignIn({ email, password });
      dispatch(login(res.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack <WavingHandIcon style={{ color: "#FFD700" }} /></Title>
        <span>Please login with your details here</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextInput label="Email" value={email} handelChange={e => setEmail(e.target.value)} />
        <TextInput label="Password" password value={password} handelChange={e => setPassword(e.target.value)} />
        <Button text="Sign In" onClick={handleSignIn} isLoading={loading} />
      </div>
    </Container>
  );
};

export default Signin;