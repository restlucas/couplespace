import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Hero content */}
      <section className="h-[350px] flex items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-center drop-shadow-lg">
          Guarde seu amor e celebre sua história.
        </h1>
        <p className="text-xl mb-8 text-center drop-shadow-lg">
          Transforme momentos em lembranças que durarão para sempre.
        </p>

        <Link
          href="/login"
          className="px-4 py-3 rounded-md font-bold shadow-lg bg-foreground duration-100 hover:bg-foreground-light"
        >
          Comece por aqui 😊
        </Link>
      </section>

      {/* How does it works? */}
      {/* Make login */}
      {/* FAQ */}
    </div>
  );
}
