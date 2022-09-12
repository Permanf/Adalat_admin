const SubscribeCard = ({ subscriber }) => {
  return (
    <aside className="bg-white px-4 py-2 border-b border-gray-100">
      {subscriber.email}
    </aside>
  );
};

export default SubscribeCard;
