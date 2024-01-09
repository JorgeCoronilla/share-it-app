import FormInput from '../../global/formInput';

export default function TextInputsGroups() {
  return (
    <>
      <div className="text-fields-container">
        <FormInput
          label="Nombre"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Group name"
        />
        <FormInput
          label="Descripción"
          type="text"
          name="description"
          autoComplete="description"
          placeholder="Group description"
        />
      </div>
    </>
  );
}
