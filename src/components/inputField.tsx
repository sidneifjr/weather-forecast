import { MagnifyingGlassPlus } from 'phosphor-react';
import { useId } from 'react';

interface InputFieldProps {
  placeholder: string;
  className?: string;
  onChange?: any;
  onKeyUp?: any;
  onKeyDown?: any;
  // onSubmit: any;
}

const InputField = (props: any) => {
  const inputId = useId();

  return (
    <div className="input-field relative">
      <input className="w-full p-5 text-lg" id={inputId} type="text" placeholder={props.placeholder} onChange={props.onChange} onKeyUp={props.onKeyUp} />

      <a className="w-8 h-8 absolute right-5 top-5 flex align-center" href="#" rel="noopener noreferrer">
        <MagnifyingGlassPlus size={32} weight="bold" />
      </a>
    </div>
  )
}

export default InputField;
