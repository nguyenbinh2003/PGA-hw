import { Button, Form, Stack } from "react-bootstrap";
import { useRef } from "react";

import TodoItem from "./todoItem/TodoItem";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hooks";
import { addTodo } from "@/src/stores/todoReducer";

const TodoPage = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className=""
        style={{ width: "40rem", position: "fixed", top: "7rem" }}
      >
        <Form.Control
          className="me-auto"
          placeholder="Add your todo here..."
          ref={ref}
        />
        <Button
          variant="primary"
          onClick={() => dispatch(addTodo(ref.current?.value))}
        >
          Add
        </Button>
      </Stack>
      <div>
        {todos?.map((item) => (
          <TodoItem id={item.id} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default TodoPage;
