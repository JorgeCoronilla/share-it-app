'use client';
import { useInvitationForm } from '@/app/lib/hooks/useInvitationForm';
import { invitationFormFields } from '@/app/ui/dashboard/forms/registerFields';
import Button from '@/app/ui/global/button';
import FormInput from '@/app/ui/global/formInput';
import FormWarning from '@/app/ui/global/formWarning';

export default function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  const { token, email } = searchParams;
  const { getData, submit, showError, onFocus, errorMessage, error, loading } =
    useInvitationForm(token);

  return (
    <div className="loginForm">
      <form
        className="login-form"
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
        <FormWarning
          showError={loading}
          message="... loading"
        />
        <FormWarning
          showError={error}
          message={errorMessage}
        />
      </form>
    </div>
  );
}
