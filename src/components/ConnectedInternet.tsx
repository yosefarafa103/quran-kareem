const ConnectedInternet = ({ isConnected }: { isConnected: boolean }) => {
    return (
        <div className="flex items-center gap-2 ">
            {isConnected ? "متصل بالانترنت" : "غير متصل بالانترنت"}
            {isConnected ?
                <span className="size-[10px] flex rounded-[50%] bg-green-500"></span> :
                <span className="size-[10px] flex rounded-[50%] bg-red-500"></span>
            }
        </div>
    )
}

export default ConnectedInternet