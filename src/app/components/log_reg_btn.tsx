export interface LogRegBtnProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  children: string;
}

export default function LogRegBtn({ children, ...rest }: LogRegBtnProps) {
  return (
    <button
      {...rest}
      className="text-background text-sm font-bold py-3 px-7 bg-foreground rounded-[30px] min-w-[131px] border border-transparent hover:text-foreground hover:bg-transparent hover:border-lightGray  active:text-foreground active:bg-transparent active:border-lightGray focus:text-foreground focus:bg-transparent focus:border-lightGray transition-all"
    >
      {children}
    </button>
  );
}
