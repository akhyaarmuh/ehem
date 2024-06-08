interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center">
      {message ? message : 'Silakan tunggu...'}
    </div>
  );
};

export default Loading;
