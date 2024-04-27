interface LoaderProps {
  height?: number;
  width?: number;
}

const Loader: React.FC<LoaderProps> = ({ height = 1.5, width = 1.5 }) => {
  const className = `inline-block h-[${height}rem] w-[${width}rem] animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-none dark:text-white`;

  return <div className={className} role="status" />;
};

export default Loader;
