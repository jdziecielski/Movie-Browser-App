import "../css/switchbutton.css"

export default function SwitchButton({label}: {label: string;}) {
    return (
        <div className="container">
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox" id={label} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};
