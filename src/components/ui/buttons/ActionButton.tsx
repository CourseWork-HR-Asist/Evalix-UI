const ActionButton = ({
  children,
  onClick,
  customClassName,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  customClassName?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={
        customClassName ||
        "bg-brand-500 flex items-center gap-2 md:gap-3 hover:bg-brand-600 text-white font-semibold py-2 md:py-3 px-4 md:px-8 rounded-full shadow-lg transition duration-300"
      }
    >
      {children}
    </button>
  );
};

export default ActionButton;
