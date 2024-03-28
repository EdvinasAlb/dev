export default function Messages({ messages }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <div key={m.id} className={`alert alert-${m.type}`}>
          {m.text}
        </div>
      ))}
    </div>
  );
}
