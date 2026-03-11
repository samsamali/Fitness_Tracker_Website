import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserSignUp } from "../Api";
import { login } from "../redux/reducers/userSlice";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const Title = styled.div`font-size:30px; font-weight:800; color:${({ theme }) => theme.text_primary};`;
const Container = styled.div`width:100%; max-width:500px; display:flex; flex-direction:column; gap:34px;`;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInput = () => !!name && !!email && !!password;

  const handleSignUp = async () => {
    if (!validateInput()) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await UserSignUp({ name, email, password });
      dispatch(login(res.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack <WavingHandIcon style={{ color: "#FFD700" }} /></Title>
        <span>Create your account</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextInput label="Full Name" value={name} handelChange={e => setName(e.target.value)} />
        <TextInput label="Email" value={email} handelChange={e => setEmail(e.target.value)} />
        <TextInput label="Password" password value={password} handelChange={e => setPassword(e.target.value)} />
        <Button text="Sign Up" onClick={handleSignUp} isLoading={loading} />
      </div>
    </Container>
  );
};

export default Signup;