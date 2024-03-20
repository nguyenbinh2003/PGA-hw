
export default function Button(props: any) {
  const { content, ...any } = props;
  return <button {...any}>{content}</button>;
}
