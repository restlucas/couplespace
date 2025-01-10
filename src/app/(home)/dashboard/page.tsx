import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PageOptions } from "./page-options";
import { getCouple } from "@/services/couple";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const couplePage = await getCouple(session?.user.id);

  if (!session) {
    redirect("/login");
  }

  return <PageOptions user={session.user} page={couplePage.data} />;

  // const router = useRouter();
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   const getInfoPage = async () => {
  //     if (session?.user) {
  //       const response = await getPage(session?.user.id);

  //     }
  //   };

  //   getInfoPage();
  // }, [session]);

  // if (status === "loading") {
  //   return (
  //     <div className="h-full w-full flex items-center justify-center">
  //       <div className="flex w-full items-center justify-center">
  //         <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
  //       </div>
  //     </div>
  //   );
  // }

  // if (!session) {
  //   router.push("/login");
  // }

  // return (
  //   // <div className="w-full h-full flex items-center justify-center">
  //   //   <div className="animate-fade-right w-full lg:w-[600px] h-[500px] p-8 rounded-md bg-[#232323]">
  //   //     <h3 className="text-xl font-bold mb-6">Minha página de casal</h3>

  //   //     <div className="mb-6">
  //   //       <div className="flex flex-col items-start justify-center gap-2">
  //   //         <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground">
  //   //           <Plus size={20} />
  //   //           <span>Gerar nova</span>
  //   //         </button>
  //   //         <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground">
  //   //           <Eye size={20} />
  //   //           <span>Visualizar</span>
  //   //         </button>
  //   //         <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground">
  //   //           <QrCode size={20} />
  //   //           <span>Reenviar QR Code</span>
  //   //         </button>
  //   //       </div>
  //   //     </div>

  //   //     <div>
  //   //       <p className="font-semibold mb-2">Link</p>
  //   //       <input
  //   //         type="text"
  //   //         className="flex-1 h-10 w-[400px] px-3 rounded-md bg-foreground"
  //   //       />
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );
}
