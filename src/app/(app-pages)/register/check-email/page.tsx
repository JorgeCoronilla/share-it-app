import FormHeader from '@/app/ui/dashboard/forms/formHeader';

export default function Page() {
  return (
    <div
      className="form-container"
      style={{ textAlign: 'center' }}
    >
      <div className="form-body">
        <FormHeader title="Revisa tu correo y confirma tu email" />
        <div style={{ width: '100%', height: '2em' }}></div>
      </div>
    </div>
  );
}
