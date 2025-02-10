
export default function Header() {
    return (
      <header className="fixed h-[10vh] w-full flex justify-between items-center bg-white">
        <div className="flex justify-around w-1/4 h-full mt-1">
          <img src="header/logoUqac.png" alt="" className="h-4/5" />
          <div className="h-4/5 w-px bg-[#6F803F]"></div>
          <div className="mt-2">
            <h1 className="font-bold">Section sportive</h1>
            <h2 className="text-[#6F803F]">Découvrez nos différents sports</h2>
          </div>
        </div>
        <div className="w-1/5 flex justify-around">
          <a href="seConnecter" className="text-[#6F803F] border border-[#6F803F] rounded px-4 py-1">Se connecter</a>
          <a href="sInscrire" className="bg-[#6F803F] text-white border border-[#6F803F] rounded px-4 py-1">S'inscrire</a>
        </div>
      </header>
    );
}
