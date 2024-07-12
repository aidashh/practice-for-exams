import React, { useReducer } from "react";
import styled from "styled-components";

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        title: action.payload,
      };
    case "add":
      if (state.updating) {
        const updateTodos = state.todos.map((item) =>
          item.id === state.updateingId ? { ...item, title: state.title } : item
        );
        return {
          ...state,
          todos: updateTodos,
          updating: false,
          title: "",
          updateingId: null,
        };
      } else {
        const newTodo = {
          title: state.title,
          id: Date.now(),
        };
        return {
          ...state,
          todos: [...state.todos, newTodo],
          title: "",
        };
      }

    case "delete":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case "update":
      return {
        ...state,
        updateingId: action.payload.id,
        updating: true,
        title: action.payload.title,
      };

    default:
      return state;
  }
}

const initialState = {
  title: "",
  todos: [],
  updating: false,
  updateingId: null,
};

export const TodoFrom = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!state.title && state.trim()) return null;

    dispatch({ type: "add", payload: state.title });
  };

  const deleteHandler = (todoId) => {
    dispatch({ type: "delete", payload: todoId });
  };

  const updateHandler = (item) => {
    dispatch({ type: "update", payload: item });
  };

  return (
    <StyledContainer>
      <StyledHOne>Todo list </StyledHOne>
      <StyledForm onSubmit={submitHandler}>
        <StyledInput
          type="text"
          placeholder="enter to-do"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "change", payload: e.target.value })
          }
        />
        <StyledButton type="submit">
          {state.updating ? "update todo" : "add Todo"}
        </StyledButton>
      </StyledForm>
      {state.todos.map((item) => (
        <StyledDiv key={item.id}>
          <StyledSpan>{item.title}</StyledSpan>
          <StyledContainerBtn>
            <StyledBtn onClick={() => deleteHandler(item.id)}>delete</StyledBtn>
            <StyledBtnTwo onClick={() => updateHandler(item)}>
              update
            </StyledBtnTwo>
          </StyledContainerBtn>
        </StyledDiv>
      ))}
    </StyledContainer>
  );
};
const StyledHOne = styled.h1`
  color: yellow;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-bottom: 20px;
`;
const StyledInput = styled.input`
  border-radius: 10px;
  width: 220px;
  height: 36px;
  padding: 10px;
  border: none;
`;
const StyledButton = styled.button`
  background-color: #949422;
  border: none;
  width: 95px;
  height: 36px;
  border-radius: 10px;
`;
const StyledDiv = styled.div`
  width: 800px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  background-color: grey;
  border-radius: 10px;
  padding: 30px;
`;
const StyledBtn = styled.button`
  background-color: #983d40;
  border: none;
  width: 85px;
  height: 26px;
  border-radius: 10px;
  color: white;
`;
const StyledBtnTwo = styled.button`
  background-color: #3aac43;
  border: none;
  width: 85px;
  height: 26px;
  border-radius: 10px;
  color: white;
`;
const StyledSpan = styled.span`
  color: white;
  font-size: large;
`;
const StyledContainerBtn = styled.div`
  display: flex;
  gap: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  gap: 40px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
