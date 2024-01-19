import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
const Protected = ({ Components }) => {
  const navigate = useNavigate();
  async function getToken() {
    try {
      const token = localStorage.getItem("authtoken");
      if (token) {
        await jose.jwtVerify(
          token,
          new TextEncoder().encode("secretjwtstring")
        );
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  useEffect(() => {
    getToken().then((res) => {
      if (!res) {
        navigate("/");
      } else {
        navigate("/home");
      }
    });
  }, []);
  return <>{Components}</>;
};

export default Protected;