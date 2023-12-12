export default function TextInputsGroups() {
  return (
    <>
      <div className="text-fields-container">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Group name"
          name="name"
        />
        <label>Descripción</label>
        <input
          type="text"
          placeholder="Group description"
          name="description"
        />
      </div>
    </>
  );
}
