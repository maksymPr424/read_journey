export interface LogRegBtnProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  children: string;
}

export default function LogRegBtn({ children }: LogRegBtnProps) {
  return (
    <button className="text-background text-sm font-bold py-3 px-7 bg-foreground rounded-[30px] min-w-[131px] hover:text-foreground hover:bg-transparent hover:border hover:border-lightGray  active:text-foreground active:bg-transparent active:border active:border-lightGray focus:text-foreground focus:bg-transparent focus:border focus:border-lightGray transition-all">
      {children}
    </button>
  );
}
