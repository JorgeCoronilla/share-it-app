'use client';
import { useInvitationForm } from '@/app/lib/hooks/useInvitationForm';
import FormHeader from '@/app/ui/components/dashboard/forms/formHeader';
import { invitationFormFields } from '@/app/ui/components/dashboard/forms/registerFields';
import FormError from '@/app/ui/components/dashboard/warnings/formError';
import FormWarning from '@/app/ui/components/dashboard/warnings/formWarning';
import Button from '@/app/ui/components/global/button';
import FormInput from '@/app/ui/components/global/formInput';
import Loading from '@/app/ui/components/global/loading';

export default function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  const { token, email } = searchParams;
  const { getData, submit, showError, onFocus, errorMessage, error, loading } =
    useInvitationForm(token);

  return (
    <div className="form-body">
      <FormHeader title="Nuevo usuario" />
      <form
        className="form-main"
        onSubmit={submit}
      >
        <h1>Nuevo usuario</h1>
        {invitationFormFields(email).map((field) => (
          <div key={`container-${field.name}`}>
            <FormInput
              key={field.name}
              getData={getData}
              label={field.label}
              type={field.type}
              name={field.name}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={field.value}
              readOnly={field.readOnly}
            />
            <FormWarning
              key={`warning-${field.name}`}
              showError={showError[field.name] && onFocus[field.name]}
              message={field.message}
            />
          </div>
        ))}

        <Button
          type="submit"
          text="Registrarse"
          className={
            !showError.allfields && !loading
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={showError.allfields}
        />
        <Loading
          showError={loading}
          message="... loading"
        />
      </form>
      <FormError
        showError={error}
        message={errorMessage}
      />
    </div>
  );
}
