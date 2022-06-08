interface TitleProps {
  text: string,
  className?: string
}

function Title(props: TitleProps){
  return (
    <h1 className={props.className}>{props.text ?? 'title'}</h1>
  )
}

export default Title;