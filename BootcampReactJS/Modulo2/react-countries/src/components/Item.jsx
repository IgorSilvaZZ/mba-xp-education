export const Item = ({ children: value = "Valor", label = "Nome País" }) => {
  return (
    <>
      <span className='text-sm'>
        <strong>{label}</strong> {value}
      </span>
    </>
  );
};
