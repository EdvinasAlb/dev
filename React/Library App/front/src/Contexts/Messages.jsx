import { createContext, useCallback, useState } from "react";
import { v4 as uuid4 } from "uuid";

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback(({ text, type }) => {
    const id = uuid4();
    setMessages((m) => [...m, { text, type, id }]);
    setTimeout((_) => {
      setMessages((m) => m.filter((m) => m.id !== id));
    }, 5000);
  }, []);

  return (
    <MessagesContext.Provider value={{ addMessage }}>
      <>
        {messages.length > 0 && (
          <div className="messages">
            {messages.map((messages) => (
              <div
                key={messages.id}
                className={`alert alert-${messages.type}`}
                role="alert"
                onClick={(_) =>
                  setMessages((m) => m.filter((m) => m.id !== messages.id))
                }
              >
                {messages.text}
              </div>
            ))}
          </div>
        )}
        {children}
      </>
    </MessagesContext.Provider>
  );
};
