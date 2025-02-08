export interface TransButtonProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  children: string;
}

export default function TransButton({ children, ...rest }: TransButtonProps) {
  return (
    <button
      {...rest}
      className="py-[10px] px-5 rounded-[30px] border border-lightGray text-bolt text-sm bg-transparent hover:text-background hover:bg-foreground active:text-background active:bg-foreground
      focus:text-background focus:bg-foreground transition-all"
    >
      {children}
    </button>
  );
}
