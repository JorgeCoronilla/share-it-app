'use client';
import Button from '@/app/ui/global/button';
import FormInput from '@/app/ui/global/formInput';
import FormWarning from '@/app/ui/global/formWarning';
import { useAddFriend } from '@/app/lib/hooks/useAddFriend';
import InputList from '../../global/inputList';
interface InviteFriendFormProps {
  groups?: GroupData[];
  user: User;
}
export default function InviteFriendForm({
  groups,
  user,
}: InviteFriendFormProps) {
  const { getData, submit, showError, loading } = useAddFriend(
    {
      group: '',
      email: '',
    },
    user
  );

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
          className="submit-button"
          text="Añadir amigo"
        />
      </form>
      <FormWarning
        showError={showError}
        message="Escribe un correo válido"
      />
      <FormWarning
        showError={loading}
        message="... Loading"
      />
    </div>
  );
}
