interface TitleProps {
  text: string,
  className?: string
}

const Title = (props: TitleProps) => {
  return (
    <h2 className={props.className}>{props.text ?? 'title'}</h2>
  )
}

export default Title;