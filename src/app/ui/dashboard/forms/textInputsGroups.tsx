import FormInput from '../../global/formInput';

interface Props {
  getData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function TextInputsGroups({ getData, onClick }: Props) {
  return (
    <>
      <div className="text-fields-container">
        <FormInput
          label="Nombre"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Group name"
          getData={getData}
          onClick={onClick}
        />
        <FormInput
          label="Descripción"
          type="text"
          name="description"
          autoComplete="description"
          placeholder="Group description"
          getData={getData}
          onClick={onClick}
        />
      </div>
    </>
  );
}
