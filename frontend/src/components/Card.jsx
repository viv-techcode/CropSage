function Card({ title, description }) {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white w-full">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
}

export default Card;