

interface EmptySpaceInterface{
    label:string
}

export const LoadingSpace=({label}:EmptySpaceInterface)=>{
    return (
        <div className="h-full p-2 flex flex-col items-center">
            
            <p className="items-center text-ml text-gray-500">
                {label}
            </p>
        </div>
    )
}