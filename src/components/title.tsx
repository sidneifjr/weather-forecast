interface TitleProps {
  text: string,
  className?: string
}

function Title(props: TitleProps){
  return (
    <h2 className={props.className}>{props.text ?? 'title'}</h2>
  )
}

export default Title;