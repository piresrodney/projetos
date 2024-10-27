interface PropriedadesInput {
  propsInput: {
    label: string;
    name: string;
    type: string;
    value: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ propsInput, onChange }: PropriedadesInput) => {
  const { label, name, type, value } = propsInput;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
