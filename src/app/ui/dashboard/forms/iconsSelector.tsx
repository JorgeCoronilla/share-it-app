import { icons } from '@/app/lib/constants';

export default function IconsSelector() {
  const handleIconClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const icons =
      document.querySelectorAll<HTMLInputElement>('input.icon-input');
    icons.forEach((icon) => {
      if (icon.id !== e.target.id) icon.checked = false;
    });
  };
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
              onChange={handleIconClick}
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
