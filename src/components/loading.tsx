import { CircleNotch } from 'phosphor-react';

const Loading = (props: any) => {
  return (
    // <div className={"w-full h-full bg-white py-8 absolute top-0 bottom-0 flex justify-center items-center flex-col z-10" + props.className}>
    <div className={"w-full h-full bg-white py-8 my-10 flex justify-center items-center flex-col" + props.className}>
      <CircleNotch size={32} weight='bold' className='animate-spin'></CircleNotch>
      <p className="text-2xl my-2 text-center">Fetching...</p>
    </div>
  )
}

export default Loading;
