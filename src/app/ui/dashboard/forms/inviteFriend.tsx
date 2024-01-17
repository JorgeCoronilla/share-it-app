'use client';
import Button from '@/app/ui/global/button';
import FormInput from '@/app/ui/global/formInput';
import FormWarning from '@/app/ui/global/formWarning';
import { useAddFriend } from '@/app/lib/hooks/useAddFriend';
import InputList from '../../global/inputList';
import { useEffect } from 'react';
interface InviteFriendFormProps {
  groups?: GroupData[];
  user: User;
}
export default function InviteFriendForm({
  groups,
  user,
}: InviteFriendFormProps) {
  const { getData, submit, showError, loading, onFocus, error, errorMessage } =
    useAddFriend(user);
  useEffect(() => {}, [showError]);
  return (
    <div>
      <form onSubmit={submit}>
        <FormInput
          getData={getData}
          label="Grupo"
          type="text"
          name="group"
          placeholder="Group name"
          list="groups"
        />
        <InputList list={groups} />

        <FormInput
          label="Escribe su correo"
          type="text"
          name="email"
          autoComplete="email"
          placeholder="myfriend@me.com"
          getData={getData}
        />

        <Button
          type="submit"
          text="Añadir amigo"
          className={
            !showError.email && !showError.group
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={showError.email && showError.group}
        />

        <FormWarning
          showError={error}
          message={errorMessage}
        />
        <FormWarning
          showError={loading}
          message="... Loading"
        />
      </form>
    </div>
  );
}
