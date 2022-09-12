import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <main className="flex items-center flex-col font-montserrat-bold">
        <h1 className="text-6xl xl:text-9xl mb-5"> 404 </h1>
        <h3 className="text-2xl xl:text-5xl"> Beýle sahypa ýok! </h3>
      </main>

      <footer className="mt-20">
        <NavLink
          to="/"
          className="bg-white font-bold text-green-600 shadow-lg px-10 py-4"
        >
          Baş sahypa dolan
        </NavLink>
      </footer>
    </section>
  );
};

export default NotFound;
