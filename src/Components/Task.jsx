import { useReducer, useRef } from "react";
import "./Task.css";

const reducer = (initState, action) => {
  switch (action.type) {
    case "Add":
      return [
        ...initState,
        { id: Date.now(), text: action.payload, isVisible: true },
      ];

    case "Toggle":
      return initState.map((ele) => {
        return ele.id === action.payload
          ? { ...ele, isVisible: !ele.isVisible }
          : ele;
      });

    default:
      return initState;
  }
};

const TaskList = () => {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, []);

  const addTask = (e) => {
    return (
      dispatch({ type: "Add", payload: e.target.value }),
      (inputRef.current.value = "")
    );
  };

  const toggleTask = (taskId) => {
    return dispatch({ type: "Toggle", payload: taskId });
  };

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }), inputRef.current.focus();
  };

  return (
    <div id="container">
      <div id="input-holder">
        <input
          type="text"
          placeholder="Add you task..."
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addTask(e);
            }
          }}
        />
      </div>

      <div>
        {state.map((ele) => {
          return (
            <div id="text" key={ele.id}>
              {ele.isVisible ? (
                <div id="flex">
                  <p>{ele.text}</p>

                  <button id="toggle" onClick={() => toggleTask(ele.id)}>
                    Toggle
                  </button>
                </div>
              ) : (
                <div id="flex-dub">
                  The Content Is Hidden
                  <button id="toggle-duo" onClick={() => toggleTask(ele.id)}>Toggle</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        {state.length ? (
          <button id="scroll-btn" onClick={scroll}>
            Scroll to Top
          </button>
        ) : (
          <p id="init-msg">No Items in the Task !</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
