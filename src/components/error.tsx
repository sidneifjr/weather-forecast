import { Warning } from "phosphor-react";

function Error(){
  return (
    <div className="bg-white py-8 my-8 flex items-center flex-col">
      <Warning size={32} weight="bold" />
      <p className="text-2xl my-2">error, not found</p>
    </div>
  )
}

export default Error;
