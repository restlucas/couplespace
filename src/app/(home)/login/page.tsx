import { LoginOptions } from "./options";

export default function Login() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full lg:w-[500px] h-auto p-8 rounded-md bg-[#232323] shadow-lg">
        <h3 className="font-bold text-2xl  mb-2">Login</h3>
        <p className="text-sm mb-8">Faça login usando um dos métodos abaixo</p>

        <LoginOptions />
      </div>
    </div>
  );
}
