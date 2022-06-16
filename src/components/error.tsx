import { Warning } from "phosphor-react";

function Error(){
  return (
    <div className="bg-white py-8 my-8 flex items-center flex-col">
      <Warning size={64} weight="bold" color="red" />
      <p className="text-2xl my-2 text-center">Value invalid! <br /> Please, try again.</p>
    </div>
  )
}

export default Error;
