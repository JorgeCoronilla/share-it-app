'use client';
import Button from '@/app/ui/components/global/button';
import FormInput from '@/app/ui/components/global/formInput';
import FormWarning from '@/app/ui/dashboard/warnings/formWarning';
import { useAddFriend } from '@/app/lib/hooks/useAddFriend';
import { useEffect } from 'react';
import Select from '../../global/select';
import Loading from '../../global/loading';
import FormError from '../warnings/formError';
interface InviteFriendFormProps {
  groups?: GroupData[];
  user: User;
}
export default function InviteFriendForm({
  groups,
  user,
}: InviteFriendFormProps) {
  const { getData, submit, showError, loading, onFocus, error, errorMessage } =
    useAddFriend(user, groups || []);
  useEffect(() => {}, [showError]);

  return (
    <>
      <div>
        <form onSubmit={submit}>
          <Select
            label="Nombre del grupo"
            groups={groups}
            getData={getData}
            name="group"
          />
          <FormInput
            label="Escribe su correo"
            type="text"
            name="email"
            autoComplete="email"
            placeholder="myfriend@me.com"
            getData={getData}
          />
          <FormWarning
            showError={showError.email}
            message={'Email no valido'}
          />
          <Button
            type="submit"
            text="Añadir amigo"
            className={
              !showError.email && !showError.group && !loading
                ? 'submit-button'
                : 'submit-button disabled'
            }
            disabled={showError.email && showError.group}
          />
        </form>
      </div>

      <Loading
        showError={loading}
        message="... loading"
      />
      <FormError
        showError={error}
        message={errorMessage}
      />
    </>
  );
}
