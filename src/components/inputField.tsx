import { MagnifyingGlassPlus } from 'phosphor-react';

interface InputFieldProps {
  placeholder: string;
  className?: string;
  onChange?: any;
  // onSubmit: any;
}

function InputField(props: any){
  return (
    <div className="input-field relative">
      <input className="w-full p-5 text-lg" type="text" placeholder={props.placeholder} onChange={props.onChange} />

      <a className="flex w-8 h-8 absolute right-5 top-5 align-center" href="#" rel="noopener noreferrer">
        <MagnifyingGlassPlus size={32} weight="bold" />
      </a>
    </div>
  )
}

export default InputField;
