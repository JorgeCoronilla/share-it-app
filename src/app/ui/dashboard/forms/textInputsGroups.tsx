import FormInput from '../../global/formInput';

interface Props {
  getData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInputsGroups({ getData }: Props) {
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
        />
        <FormInput
          label="Descripción"
          type="text"
          name="description"
          autoComplete="description"
          placeholder="Group description"
          getData={getData}
        />
      </div>
    </>
  );
}
