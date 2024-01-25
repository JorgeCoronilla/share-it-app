import FormInput from '../../global/formInput';
import FormWarning from '../warnings/formWarning';

interface Props {
  getData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  showError: Record<string, boolean>;
  onFocus: Record<string, boolean>;
}

export default function TextInputsGroups({
  getData,
  onClick,
  showError,
  onFocus,
}: Props) {
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
        <FormWarning
          showError={showError.name && onFocus.name}
          message="Nombre de grupo no válido"
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
        <FormWarning
          showError={showError.description && onFocus.description}
          message="Descripción no válida"
        />
      </div>
    </>
  );
}
