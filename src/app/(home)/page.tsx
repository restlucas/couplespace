import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

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
          href={session && session.user ? `/dashboard` : `/login`}
          className="px-4 py-3 rounded-md font-bold shadow-lg bg-foreground duration-100 hover:bg-foreground-light"
        >
          {session && session.user
            ? `Ir para o dashboard 😊`
            : `Comece por aqui 😊`}
        </Link>
      </section>

      {/* How does it works? */}
      {/* Make login */}
      {/* FAQ */}
    </div>
  );
}
