interface Props {
  isFullScreen?: boolean;
}
const Loader = ({ isFullScreen = false }: Props) => {
  return (
    <>
      {isFullScreen ? (
        <div className="flex items-center justify-center h-svh">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-transparent border-r-green-400 border-solid mx-auto my-5"></div>
        </div>
      ) : (
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-transparent border-r-green-400 border-solid mx-auto my-5"></div>
      )}
    </>
  );
};

export default Loader;
