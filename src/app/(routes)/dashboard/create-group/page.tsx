import FormHeader from '@/app/ui/forms/formHeader';
import GroupForm from '@/app/ui/forms/groupForm';

export default function AddGroupButton() {
  return (
    <div className="new-group-modal">
      <FormHeader title="Crear nuevo grupo" />
      <GroupForm />
    </div>
  );
}
