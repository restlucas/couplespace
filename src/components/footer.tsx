import { Link } from "@/i18n/routing";

export function Footer() {
  return (
    <footer className="w-full min-h-16 flex items-center justify-center">
      <span className="text-xs drop-shadow-lg">
        developed by{" "}
        <Link
          href="https://github.com/restlucas"
          target="_blank"
          className=" font-bold duration-100 hover:underline"
        >
          restlucas
        </Link>
      </span>
    </footer>
  );
}
