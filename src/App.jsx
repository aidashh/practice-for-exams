import React, { useEffect, useState } from "react";
import { TodoFrom } from "./components/TodoFrom";
import styled from "styled-components";
function Request() {
  const [todo, setTodo] = useState([]);
  console.log(todo);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setTodo(data.results));
  }, []);
  return (
    <>
      <h2>rick and morty</h2>
      {todo.map((item) => (
        <StyledAllContainer key={item.id}>
          <StyledDiv>
            <div>
              <StyledH1>{item.name}</StyledH1>
              <h3>{item.status}</h3>
              <p>{item.type}</p>
              <p>{item.species}</p>
            </div>
            <StyledImage src={item.image} alt="" />
            <StyledButton href="https://www.kinopoisk.ru/series/685246/?utm_referrer=www.google.com">
              look a cartoon
            </StyledButton>
          </StyledDiv>
        </StyledAllContainer>
      ))}
    </>
  );
}

function App() {
  const [state, setState] = useState(false);

  const [rick, setRick] = useState(false);

  function rickii() {
    setRick(!rick);
  }
  function TodoList() {
    setState(!state);
  }
  return (
    <StyledContainerAll>
      <StyledName>Plese click a buttons</StyledName>
      <StyledBtn onClick={TodoList}>Todo-list</StyledBtn>

      <StyledBtnTwo onClick={rickii}>Rick and Morty</StyledBtnTwo>
      {state ? <TodoFrom /> : null}
      {rick ? <Request></Request> : null}
    </StyledContainerAll>
  );
}

export default App;
const StyledName = styled.h2`
  color: yellow;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const StyledBtn = styled.button`
  border: none;
  width: 100px;
  height: 36px;
  border-radius: 10px;
  color: white;
  background-color: #b2b528;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const StyledBtnTwo = styled.button`
  border: none;
  width: 100px;
  height: 36px;
  border-radius: 10px;
  background-color: #3059a6;
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const StyledContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 40px;
`;

//// request

const StyledDiv = styled.div`
  background-color: #93a0ab;
  h3 {
    color: white;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  p {
    color: white;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  border-radius: 15px;
  width: 500px;
  height: 380px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;
const StyledImage = styled.img`
  width: 200px;
  height: 180px;
  border-radius: 5px;
`;
const StyledH1 = styled.h1`
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const StyledButton = styled.a`
  background-color: #495fd8;
  text-decoration: none;
  width: 150px;
  height: 50px;
  color: white;
  border-radius: 10px;
  text-align: center;
`;
const StyledAllContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
