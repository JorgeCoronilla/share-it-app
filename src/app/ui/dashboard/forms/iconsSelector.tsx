import { icons } from '@/app/lib/constants';

interface Props {
  getData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IconsSelector({ getData }: Props) {
  return (
    <>
      <div className="icons-container">
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
    </>
  );
}
