import { Form, Stack } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { useAppDispatch } from "@/src/hooks/hooks";
import { editTodo, removeTodo } from "@/src/stores/todoReducer";

export default function TodoItem({ id, title }: { id: string; title: string }) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <>
      <Stack direction="horizontal" gap={3} style={{ position: "relative" }}>
        <Form.Control
          type="text"
          id={id}
          aria-describedby="todoItemHelps"
          defaultValue={title}
          style={{ width: "40rem" }}
          onFocus={() => setIsFocus(true)}
          //   onBlur={() => setIsFocus(false)}
          ref={ref}
        />
        {isFocus ? (
          <>
            <button
              className="d-flex justify-content-center"
              style={{
                position: "absolute",
                background: "transparent",
                color: "green",
                fontSize: "1rem",
                padding: "6px",
                right: "50px",
              }}
              onClick={() => {
                dispatch(
                  editTodo({
                    id: String(ref.current?.id),
                    title: ref.current?.value,
                  })
                );
                setIsFocus(false);
              }}
            >
              <AiOutlineCheck />
            </button>
            <button
              className="d-flex justify-content-center"
              style={{
                position: "absolute",
                background: "transparent",
                color: "red",
                fontSize: "1rem",
                padding: "6px",
                right: "10px",
              }}
              onClick={() => {
                dispatch(removeTodo(String(ref.current?.id)));
                setIsFocus(false);
              }}
            >
              <FaRegTrashAlt />
            </button>
          </>
        ) : (
          ""
        )}
      </Stack>
      <hr />
    </>
  );
}
