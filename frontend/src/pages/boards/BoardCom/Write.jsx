import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import WritePageBottom from "./WriteAtoms/WritePageBottom";
import TinyMCEEditor from "./WriteAtoms/Editor";

const WriteWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative;
  height: 1200px;
`;

const BoardTitle = styled(Box)`
  /* border: 1px solid #414040; */
  margin: 0 auto;
  width: 1100px;
  height: 100px;
`;

const InputTitle = styled(Input)`
  width: 100%;
  padding: 30px 20px;
`;

const BoardConntent = styled(Box)`
  width: 1100px;
  margin: 0 auto;
  /* border: 1px solid black; */
  height: 800px;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAyNTQ0MDY3LCJleHAiOjE3MDI1NDc2Njd9.j_PJNousIqv45uV4QT8q_EDM0BP4sxTzkfcpTfb1HL4";

  const handleSave = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    const response = await fetch("https://api.subin.kr/boards", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: "#javascript",
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate(`/boards/${result.id}`);
    }
  };
  return (
    <>
      <WriteWrap>
        <BoardTitle>
          <InputTitle
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />
        </BoardTitle>
        <BoardConntent>
          <TinyMCEEditor value={content} onChange={handleContentChange} />
        </BoardConntent>
        <WritePageBottom handleSave={handleSave} disabled={!title} />
      </WriteWrap>
    </>
  );
};

export default Write;
