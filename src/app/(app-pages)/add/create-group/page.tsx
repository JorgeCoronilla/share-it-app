import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import GroupForm from '@/app/ui/dashboard/forms/groupForm';

export default function AddGroupButton() {
  return (
    <div className="form-container">
      <div className="form-body">
        <FormHeader title="Crear nuevo grupo" />
        <GroupForm />
      </div>
    </div>
  );
}
