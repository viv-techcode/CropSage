function Card({ title, description }) {
  return (
    <div className="border rounded-lg p-5 shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-base">
        {description}
      </p>
    </div>
  );
}

export default Card;