import { icons } from '@/app/lib/constants';

interface Props {
  getData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  focusContainer: boolean;
  value?: string;
}

export default function IconsSelector({
  getData,
  onClick,
  focusContainer,
}: Props) {
  return (
    <>
      <label className="icon-label">Selecciona icono</label>
      <div
        className={`icons-container ${
          focusContainer ? `container-focus` : `container-unfocus`
        }`}
      >
        <div className="icons-inner-container">
          {icons.map((icon, index) => (
            <div
              key={icon}
              className="icon-container"
            >
              <input
                type="checkbox"
                id={`checkbox${index}`}
                className="icon-input"
                onChange={getData}
                name="icon"
                value={icon}
                onClick={onClick}
              />
              <label
                className="icon"
                htmlFor={`checkbox${index}`}
              >
                <img
                  key={index}
                  src={`/icons/${icon}.svg`}
                  alt={icon}
                  className="card-icon"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
