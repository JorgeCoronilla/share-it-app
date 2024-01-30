import FormHeader from '@/app/ui/components/dashboard/forms/formHeader';
import GroupForm from '@/app/ui/components/dashboard/forms/groupForm';

export default function Page() {
  return (
    <div className="form-container">
      <div className="form-body">
        <FormHeader title="Crear nuevo grupo" />
        <GroupForm />
      </div>
    </div>
  );
}
